import React from "react";
import { createRoot } from "react-dom/client";
import "@/assets/css/style.css";
import { OptionsPage } from "@/pages/OptionsPage/OptionsPage";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <OptionsPage />
  </React.StrictMode>,
);
