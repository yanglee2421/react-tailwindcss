// Router Imports
import { createHashRouter, createBrowserRouter } from "react-router-dom";
import { routes } from "./router-routes";

export const router = import.meta.env.PROD
  ? createHashRouter(routes)
  : createBrowserRouter(routes, { basename: "/react-antd" });
