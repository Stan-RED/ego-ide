import { IQueryPayload } from "@lab/api-server";
import { Action } from "redux";

export enum TransactionActionTypes {
  DO = "ITransaction.do",
  ROLLBACK = "ITransaction.rollback",
  COMMIT = "ITransaction.commit",
  COMMIT_SUCCESS = "ITransaction.commitSuccess",
  COMMIT_FAIL = "ITransaction.commitFail"
}

// tslint:disable:max-classes-per-file
export class Do implements Action {
  readonly type = TransactionActionTypes.DO;

  constructor(public payload: IQueryPayload) {}
}

export class Rollback implements Action {
  readonly type = TransactionActionTypes.ROLLBACK;
}

export class Commit implements Action {
  readonly type = TransactionActionTypes.COMMIT;
}

export class CommitSuccess implements Action {
  readonly type = TransactionActionTypes.COMMIT_SUCCESS;

  // constructor(public payload: [ID[]]) {}
}

export class CommitFail implements Action {
  readonly type = TransactionActionTypes.COMMIT_FAIL;

  constructor(public payload: any) {}
}

export type TransactionAction =
  | Do
  | Rollback
  | Commit
  | CommitSuccess
  | CommitFail;
