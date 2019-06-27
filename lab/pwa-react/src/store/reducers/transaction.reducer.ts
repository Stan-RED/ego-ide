import { IQueryPayload } from "@lab/api-server";

import { TransactionAction, TransactionActionTypes } from "../actions";

export type ITransaction = IQueryPayload[];

export interface ITransactionState {
  transaction: ITransaction;
  log: ITransaction[];
}

export const initialState: ITransactionState = {
  log: [],
  transaction: []
};

export default function reducer(
  state = initialState,
  action: TransactionAction
): ITransactionState {
  switch (action.type) {
    case TransactionActionTypes.DO: {
      const transaction = state.transaction.slice();
      transaction.push(action.payload);

      return {
        ...state,
        transaction
      };
    }

    case TransactionActionTypes.ROLLBACK: {
      return {
        ...state,
        transaction: []
      };
    }

    case TransactionActionTypes.COMMIT: {
      const log = state.log.slice();
      log.push(state.transaction);

      return {
        ...state,
        log,
        transaction: []
      };
    }

    default: {
      return state;
    }
  }
}

export const selectTransaction = (state: ITransactionState) =>
  state.transaction;
export const selectTransactionsLog = (state: ITransactionState) => state.log;
