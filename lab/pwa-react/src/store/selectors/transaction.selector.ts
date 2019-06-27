import { createSelector } from "reselect";

import * as fromFeature from "../reducers";
import * as fromReducer from "../reducers/transaction.reducer";

export const selectTransaction = createSelector(
  fromFeature.selectTransactionState,
  fromReducer.selectTransaction
);

export const selectTransactionsLog = createSelector(
  fromFeature.selectTransactionState,
  fromReducer.selectTransactionsLog
);
