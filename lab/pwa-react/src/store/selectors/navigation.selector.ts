import { createSelector } from "reselect";

import * as fromFeature from "../reducers";
import * as fromReducer from "../reducers/navigation.reducer";

export const selectHistory = createSelector(
  fromFeature.selectNavigationState,
  fromReducer.selectHistory
);
