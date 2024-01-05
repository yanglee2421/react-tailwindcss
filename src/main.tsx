// React Imports
import React from "react";
import ReactDOM from "react-dom/client";

// App Imports
import { App } from "./App";

// Styles Imports
import "antd/dist/reset.css";
import "@/assets/scss/global.scss";

// I18n Imports
import "@/i18n";

const container = (() => {
  const containerId = "root";

  const existedEl = document.getElementById(containerId);
  if (existedEl) {
    return existedEl;
  }

  const newEl = document.createElement("div");
  newEl.id = containerId;
  document.body.append(newEl);
  return newEl;
})();

ReactDOM.createRoot(container).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
