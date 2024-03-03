import {
  RouterProvider,
  createBrowserHistory,
  createHashHistory,
  createRouter,
} from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import { ThemeProvider } from "@/theme/ThemeProvider";
import { QueryProvider } from "@/components/QueryProvider";

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
  basepath: import.meta.env.PROD ? void 0 : "/react-antd",
});
