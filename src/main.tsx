// React Imports
import ReactDOM from "react-dom/client";
import React from "react";

// ** App
import { App } from "./App";

// Styles Imports
import "antd/dist/reset.css";
import "@yanglee2421/scss";

// Provider Imports
import { ReactRedux } from "@/redux";
import { ReactQuery } from "@/components/-provider";

// ** Element
const el = document.querySelector("#root");
if (!el) throw new Error("invalid element");

// ** Root
const root = ReactDOM.createRoot(el);
root.render(
  <React.StrictMode>
    <ReactRedux>
      <ReactQuery>
        <App />
      </ReactQuery>
    </ReactRedux>
  </React.StrictMode>
);
