import React from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
/**
 * Update state
 * Generate new JSX object
 * Compare JSX type
 * if same ? update fiber : replace fiber
 * render to HTML
 */
