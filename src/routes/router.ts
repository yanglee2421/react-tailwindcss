// Router Imports
import { createBrowserRouter, createHashRouter } from "react-router-dom";
import { routes } from "./router-routes";

const mode = import.meta.env.MODE;

let basename = "/base";
switch (mode) {
  case "live":
    basename = "/dist";
}

export const router = createBrowserRouter(routes, { basename });
void createHashRouter(routes);
