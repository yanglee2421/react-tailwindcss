import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import "antd/dist/reset.css";
import "@yanglee2421/scss";
import { store, Provider, persistor } from "@/redux";
import { PersistGate } from "redux-persist/integration/react";
import { ReactQuery } from "@/components/Provider";

const root = document.querySelector("#root")!;
ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <ReactQuery>
          <App />
        </ReactQuery>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
