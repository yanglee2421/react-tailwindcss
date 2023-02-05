import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
// ant-design
import "antd/dist/reset.css";
// 全局状态
import { Provider } from "react-redux";
import { store } from "@/redux";
import "normalize.css";
import "@/assets/reset.scss";

const root = document.querySelector("#root")!;
ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
