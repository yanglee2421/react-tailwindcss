import React from "react";
import { createRoot } from "react-dom/client";

createRoot(
  (() => {
    const containerId = "root";
    const container = document.getElementById(containerId);
    if (container) {
      return container;
    }

    const el = document.createElement("div");
    el.id = containerId;
    document.body.append(el);
    return el;
  })(),
).render(<React.StrictMode>content_scripts</React.StrictMode>);
