import { throttle } from "lodash";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";

import App from "./App";
import "./index.css";
import registerServiceWorker from "./registerServiceWorker";
import { saveState } from "./store/localStorage";
import store from "./store/store";

// WORK: Route idea - as API query object?

store.subscribe(
  // WORK: No throttle usage, we can skip some changes that way?
  throttle(() => {
    saveState({
      core: store.getState().core,
      navigation: store.getState().navigation
    });
  }, 1000)
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root") as HTMLElement
);
registerServiceWorker();
