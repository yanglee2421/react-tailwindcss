import {
  RouterProvider,
  createBrowserHistory,
  createHashHistory,
  createRouter,
} from "@tanstack/react-router";
import { QueryProvider } from "@/components/QueryProvider";
import { ThemeProvider } from "@/theme/ThemeProvider";
import { routeTree } from "./routeTree.gen";

export function App() {
  return (
    <QueryProvider>
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    </QueryProvider>
  );
}

const router = createRouter({
  routeTree,
  history: import.meta.env.PROD ? createHashHistory() : createBrowserHistory(),
  basepath: import.meta.env.PROD ? void 0 : "/react-antd",
});
