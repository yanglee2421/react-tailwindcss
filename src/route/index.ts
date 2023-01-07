import { createBrowserRouter, createHashRouter } from "react-router-dom";
import { routes } from "./routes";
export const router =
  import.meta.env.MODE === "gitee"
    ? createHashRouter(routes)
    : createBrowserRouter(routes, { basename: "/react/" });
