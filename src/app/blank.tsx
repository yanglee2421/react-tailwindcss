import React from "react";
import { createRoot } from "react-dom/client";
import "@/assets/css/style.css";
import { Component } from "@/pages/bottle";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Component />
  </React.StrictMode>,
);
