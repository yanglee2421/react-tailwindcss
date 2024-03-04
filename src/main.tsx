import React from "react";
import ReactDOM from "react-dom/client";

import { App } from "./App";
import "antd/dist/reset.css";

const container = document.getElementById("root");

if (container) {
  ReactDOM.createRoot(container).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
}
