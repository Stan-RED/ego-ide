import { ID } from "@ide/mesh";
import { IAspect, IStorage } from "@lab/api-server";
import { Action } from "redux";

export enum StorageActionTypes {
  // Merge some storage to existing local storage.
  MERGE = "ILocalStorage.merge",

  // Indicates start of read async operation.
  READ = "ILocalStorage.readFromRemote",

  // Stores some error on read fail.
  READ_FAIL = "ILocalStorage.readFromRemoteFail",

  // On success - renew our local storage with received entities.
  READ_SUCCESS = "ILocalStorage.readFromRemoteSuccess",

  // I'm used indicate success for read queries with some aggregates.
  // Saving those complicated states on client is not what I want to implement now.
  READ_SUCCESS_NO_LOCAL_SYNC = "ILocalStorage.readFromRemoteSuccessNoLocalSync",

  UPDATE_ASPECT_FOR_ID = "ILocalStorage.updateAspectForId",

  // Ensure transaction.commit took an effect on local storage.
  // PROCESS_TRANSACTION = "ILocalStorage.processTransaction",

  // Changes entity's id.
  CHANGE_ID = "ILocalStorage.changeId",

  ENSURE_STASH = "ILocalStorage.ensureStash",
  APPLY_STASH = "ILocalStorage.applyStash",
  DROP_STASH = "ILocalStorage.dropStash"
}

// tslint:disable:max-classes-per-file
export class Merge implements Action {
  readonly type = StorageActionTypes.MERGE;

  constructor(public payload: IStorage) {}
}

export class Read implements Action {
  readonly type = StorageActionTypes.READ;
}

export class ReadFail implements Action {
  readonly type = StorageActionTypes.READ_FAIL;
  constructor(public payload: any) {}
}

// WORK: Use merge? But it has no loaded, loading, etc.
export class ReadSuccess implements Action {
  readonly type = StorageActionTypes.READ_SUCCESS;
  constructor(public payload: IStorage) {}
}

export class ReadSuccessNoLocalSync implements Action {
  readonly type = StorageActionTypes.READ_SUCCESS_NO_LOCAL_SYNC;
}

export interface IAspectForIdPayload {
  aspect: IAspect;
  id: ID;
}

export class UpdateAspectForId implements Action {
  readonly type = StorageActionTypes.UPDATE_ASPECT_FOR_ID;

  constructor(public payload: IAspectForIdPayload) {}
}

// export class ProcessTransaction implements Action {
//   readonly type = StorageActionTypes.PROCESS_TRANSACTION;

//   constructor(public payload: ITransaction) {}
// }

export interface IChangeIdPayload {
  from: ID;
  to: ID | undefined;
}

export class ChangeId implements Action {
  readonly type = StorageActionTypes.CHANGE_ID;

  constructor(public payload: IChangeIdPayload) {}
}

export class EnsureStash implements Action {
  readonly type = StorageActionTypes.ENSURE_STASH;
}

export class ApplyStash implements Action {
  readonly type = StorageActionTypes.APPLY_STASH;
}

export class DropStash implements Action {
  readonly type = StorageActionTypes.DROP_STASH;
}

export type StorageAction =
  | Merge
  | Read
  | ReadFail
  | ReadSuccess
  | ReadSuccessNoLocalSync
  | UpdateAspectForId
  // | ProcessTransaction
  | ChangeId
  | EnsureStash
  | ApplyStash
  | DropStash;
