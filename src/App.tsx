// Router Imports
import {
  RouterProvider,
  createBrowserHistory,
  createHashHistory,
  createRouter,
} from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

// Provider Imports
import { ThemeProvider } from "@/theme";
import { QueryProvider } from "@/plugins";

export function App() {
  return (
    <QueryProvider>
      <ThemeProvider>
        <RouterProvider router={router}></RouterProvider>
      </ThemeProvider>
    </QueryProvider>
  );
}

const router = createRouter({
  routeTree,
  history: import.meta.env.PROD ? createHashHistory() : createBrowserHistory(),
  basepath: "/react-antd",
});
