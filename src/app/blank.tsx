import React from "react";
import { createRoot } from "react-dom/client";
import "@/assets/css/style.css";
import { Blank } from "@/pages/Blank/Blank";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Blank />
  </React.StrictMode>,
);
