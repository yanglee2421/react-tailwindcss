// React Imports
import React from "react";
import ReactDOM from "react-dom/client";

// App Imports
import { App } from "./App";

// Styles Imports
import "antd/dist/reset.css";
import "@yanglee2421/scss";

// Provider Imports
import { ReduxProvider } from "@/redux";
import { ReactQuery } from "@/components/-provider";

// ** Element
const el = document.querySelector("#root");
if (!el) throw new Error("invalid element");

// ** Root
const root = ReactDOM.createRoot(el);
root.render(
  <React.StrictMode>
    <ReduxProvider>
      <ReactQuery>
        <App />
      </ReactQuery>
    </ReduxProvider>
  </React.StrictMode>
);
