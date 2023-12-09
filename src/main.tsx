// React Imports
import React from "react";
import ReactDOM from "react-dom/client";

// App Imports
import { App } from "./App";

// Styles Imports
import "antd/dist/reset.css";
import "@/assets/scss/global.scss";
import "@/assets/css/style.css";

// I18n Imports
import "@/i18n";

// Fake Database Imports
import "@/api/fakedb";

init();

function init() {
  const container = document.getElementById("root");

  if (!container) {
    console.error("Can not find element #root");
    return;
  }

  ReactDOM.createRoot(container).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
