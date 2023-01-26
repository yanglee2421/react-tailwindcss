import { createBrowserRouter, createHashRouter } from "react-router-dom";
import { routes } from "./routes";
export const router =
  import.meta.env.MODE === "gitee"
    ? createHashRouter(routes, { basename: "/vite-react/" })
    : createBrowserRouter(routes, { basename: "/vite-react/" });
