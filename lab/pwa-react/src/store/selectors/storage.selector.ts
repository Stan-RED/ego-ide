import { ID } from "@ide/mesh";
import { createSelector } from "reselect";

import * as fromFeature from "../reducers";
import * as fromReducer from "../reducers/storage.reducer";

export const selectStorageError = createSelector(
  fromFeature.selectStorageState,
  fromReducer.selectError
);
export const selectStorageLoaded = createSelector(
  fromFeature.selectStorageState,
  fromReducer.selectLoaded
);
export const selectStorageLoading = createSelector(
  fromFeature.selectStorageState,
  fromReducer.selectLoading
);
export const selectStorage = createSelector(
  fromFeature.selectStorageState,
  fromReducer.selectStorage
);
export const selectAspectsForEntity = (id: ID) =>
  createSelector(
    fromFeature.selectStorageState,
    (state: fromReducer.IStorageState) => state.storage[id]
  );
