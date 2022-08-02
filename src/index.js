import React from "react";
import ReactDOM from "react-dom";

import { Provider } from "react-redux";

import "./index.css";
import App from "./App";
import store from "./store/store";

ReactDOM.render(
  // redux provider
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
