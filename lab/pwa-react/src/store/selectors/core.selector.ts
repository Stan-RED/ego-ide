import { createSelector } from "reselect";

import * as fromFeature from "../reducers";
import * as fromReducer from "../reducers/core.reducer";

export const selectFocus = createSelector(
  fromFeature.selectCoreState,
  fromReducer.selectFocus
);
export const selectPrevFocus = createSelector(
  fromFeature.selectCoreState,
  fromReducer.selectPrevFocus
);
export const selectCurrentUser = createSelector(
  fromFeature.selectCoreState,
  fromReducer.selectCurrentUser
);
export const selectCurrentAction = createSelector(
  fromFeature.selectCoreState,
  fromReducer.selectCurrentAction
);
export const selectCurrentPlugin = createSelector(
  fromFeature.selectCoreState,
  fromReducer.selectCurrentPlugin
);
