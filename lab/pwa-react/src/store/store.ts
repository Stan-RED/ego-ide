import { applyMiddleware, createStore, Store } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootReducer, { IApplicationState } from "./reducers";

import { loadState } from "./localStorage";

const persistedState = loadState();

export default createStore(
  rootReducer,
  persistedState,
  composeWithDevTools(applyMiddleware(thunk))
) as Store<IApplicationState>;
