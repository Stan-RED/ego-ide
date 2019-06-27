import { IdService, idService } from "@lab/api-server";

import { ITransaction } from "src/store/reducers/transaction.reducer";
import apiService, { ApiService } from "./ApiService";

export interface ITransactionHelper {
  // getTransactionItemCommitHook(transactionItem: IQueryPayload): Promise<any>;
  getTransactionItemCommitHook(transaction: ITransaction): Promise<any>;
}

// WORK: Have I to be existent at all?
export class TransactionHelper implements ITransactionHelper {
  constructor(public api: ApiService, public id: IdService) {}

  // WORK: Not it supports only same type of operations in the same transaction (e.g., create 2 entities, etc.)
  getTransactionItemCommitHook(transaction: ITransaction): Promise<any> {
    const creationLength = transaction.filter(
      x => x.id && this.id.isIdLocal(x.id)
    ).length;

    if (creationLength === transaction.length) {
      // Creating an entity.
      return this.api.create(transaction);
    } else if (creationLength === 0) {
      // Updating an entity.
      transaction.forEach(x => {
        if (!x.id) {
          throw new Error(
            `Transaction item ${JSON.stringify(transaction)} has no id.`
          );

          // WORK: Handle deletion - just id provided and nothing else.
        }
      });

      return this.api.update(transaction);
    } else {
      throw new Error(
        `Something went wrong when trying to commit the transaction ${JSON.stringify(
          transaction
        )}.`
      );
    }

    // if (transaction.id) {
    //   const id = transaction.id;

    //   // WORK: Handle deletion - just id provided and nothing else.
    //   if (this.id.isIdLocal(id)) {
    //     return this.api.create([transaction]);
    //   } else {
    //     return this.api.update([transaction]);
    //   }
    // } else {
    //   throw new Error(
    //     `Transaction item ${JSON.stringify(transaction)} has no id.`
    //   );
    // }
  }

  // getTransactionItemCommitHook(transactionItem: IQueryPayload): Promise<any> {
  //   if (transactionItem.id) {
  //     const id = transactionItem.id;

  //     // WORK: Handle deletion - just id provided and nothing else.
  //     if (this.id.isIdLocal(id)) {
  //       return this.api.create([transactionItem]);
  //     } else {
  //       return this.api.update([transactionItem]);
  //     }
  //   } else {
  //     throw new Error(
  //       `Transaction item ${JSON.stringify(transactionItem)} has no id.`
  //     );
  //   }
  // }
}

export const transactionHelper = new TransactionHelper(apiService, idService);
export default transactionHelper;
