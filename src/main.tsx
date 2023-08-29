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

// HTML Element
const el = document.querySelector("#root");
bootstrap(el);

function bootstrap(el: Element | null) {
  if (!el) {
    console.error("Invalid Element");
    return;
  }

  // React Root
  ReactDOM.createRoot(el).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
