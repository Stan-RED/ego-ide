import { combineReducers } from "redux";

import coreReducer, { ICoreState } from "./core.reducer";
import navigationReducer, { INavigationState } from "./navigation.reducer";
import storageReducer, { IStorageState } from "./storage.reducer";
import transactionReducer, { ITransactionState } from "./transaction.reducer";

export default combineReducers({
  core: coreReducer,
  navigation: navigationReducer,
  storage: storageReducer,
  transaction: transactionReducer
});

export interface IApplicationState {
  core: ICoreState;
  navigation: INavigationState;
  storage: IStorageState;
  transaction: ITransactionState;
}

export const selectCoreState = (state: IApplicationState) => state.core;
export const selectNavigationState = (state: IApplicationState) =>
  state.navigation;
export const selectStorageState = (state: IApplicationState) => state.storage;
export const selectTransactionState = (state: IApplicationState) =>
  state.transaction;
