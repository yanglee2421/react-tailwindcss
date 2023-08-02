// Router Imports
import { createBrowserRouter, createHashRouter } from "react-router-dom";
import { routes } from "./router-routes";

const isGitee = import.meta.env.MODE === "gitee";

export const router = isGitee
  ? createHashRouter(routes)
  : createBrowserRouter(routes, { basename: "/vite-react" });
