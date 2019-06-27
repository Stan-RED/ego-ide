import { ID } from "@ide/mesh";
import { idService, IQueryPayload } from "@lab/api-server";

import { transactionHelper } from "src/_shared/services/TransactionHelper";
import { IApplicationState } from "..";
import * as fromStorageAction from "../actions/storage.action";
import * as fromTransactionAction from "../actions/transaction.action";
import { ITransaction } from "../reducers/transaction.reducer";
import { selectTransaction } from "../selectors";

export interface ITransactionManager {
  // Returns ID's.
  commit(): (
    dispatch: any,
    getState: () => IApplicationState
  ) => Promise<ID[] | void>;

  do(
    transaction: IQueryPayload
  ): (dispatch: any, getState: () => IApplicationState) => void;

  rollback(): (dispatch: any, getState: () => IApplicationState) => void;
}

export class TransactionManager implements ITransactionManager {
  commit(): (
    dispatch: any,
    getState: () => IApplicationState
  ) => Promise<ID[] | void> {
    return (
      dispatch: any,
      getState: () => IApplicationState
    ): Promise<ID[] | void> => {
      const transaction: ITransaction = selectTransaction(getState());
      dispatch({ ...new fromTransactionAction.Commit() });
      // dispatch({ ...new fromStorageAction.ProcessTransaction(transaction) });

      return transactionHelper
        .getTransactionItemCommitHook(transaction)
        .then((res: ID[]) => {
          if (transaction.length === res.length) {
            dispatch(this.commitSuccess(transaction, res));
          } else {
            dispatch(
              this.commitFail(
                `Not every transaction step took effect on the server side. Expected number of affected ids to be ${
                  transaction.length
                }, but it is ${res.length}`
              )
            );
          }
          return res;
        })
        .catch(e => {
          dispatch(this.commitFail(e));
        });

      // return Promise.all(promises)
      //   .then(x => {
      //     if (transaction.length === x.length) {
      //       dispatch(this.commitSuccess(transaction, x));
      //     } else {
      //       dispatch(
      //         this.commitFail(
      //           `Not every transaction step took effect on the server side. Expected number of affected ids to be ${
      //             transaction.length
      //           }, but it is ${x.length}`
      //         )
      //       );
      //     }
      //     // TODO: Can we be sure that head(...) isn't undefined?
      //     return head<ID>(x[x.length - 1])!;
      //   })
      //   .catch(e => {
      //     dispatch(this.commitFail(e));
      //   });
    };
  }

  do(
    transaction: IQueryPayload
  ): (dispatch: any, getState: () => IApplicationState) => void {
    return (dispatch: any, getState: () => IApplicationState): void => {
      dispatch({ ...new fromTransactionAction.Do(transaction) });
    };
  }

  rollback(): (dispatch: any, getState: () => IApplicationState) => void {
    return (dispatch: any, getState: () => IApplicationState): void => {
      dispatch({ ...new fromTransactionAction.Rollback() });
    };
  }

  private commitSuccess = (transaction: ITransaction, ids: ID[]) => {
    return (dispatch: any, getState: () => IApplicationState): void => {
      // const storage = selectStorage(getState());

      // WORK: When inbox is working, we have to change also point.to for each entry. Hmm...
      transaction.forEach((payload, i) => {
        if (payload.id && idService.isIdLocal(payload.id)) {
          dispatch({
            ...new fromStorageAction.ChangeId({
              from: payload.id,
              to: ids[i]
            })
          });
        }
      });

      // // const aspects = new StorageItem(payload);
      // // WORK: It works with creation/update, but will fail with delete.
      // const modifyStorage: IStorage = transaction.reduce(
      //   (prev, payload, i) => ({
      //     [head(ids[i])]: new StorageItem(payload).getAspects()
      //   }),
      //   {}
      // );
      // // tslint:disable-next-line:no-console
      // console.log(modifyStorage);
    };
  };

  private commitFail = (msg: string) => (
    dispatch: any,
    getState: () => IApplicationState
  ): void => {
    dispatch({ ...new fromTransactionAction.CommitFail(msg) });

    // WORK: Remove me?
    throw new Error(msg);
  };
}

const transactionManager = new TransactionManager();
export default transactionManager;
