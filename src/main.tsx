import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import "antd/dist/reset.css";
import "@yanglee2421/scss";
import { ReactRedux } from "@/redux";
import { ReactQuery } from "@/components/provider";

const root = document.querySelector("#root")!;
ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <ReactRedux>
      <ReactQuery>
        <App />
      </ReactQuery>
    </ReactRedux>
  </React.StrictMode>
);
