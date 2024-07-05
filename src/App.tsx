import {
  RouterProvider,
  createBrowserHistory,
  createHashHistory,
  createRouter,
} from "@tanstack/react-router";
import { QueryProvider } from "@/components/QueryProvider";
import { routeTree } from "./routeTree.gen";

export function App() {
  return (
    <QueryProvider>
      <RouterProvider router={router} />
    </QueryProvider>
  );
}

const router = createRouter({
  routeTree,
  history: import.meta.env.PROD ? createHashHistory() : createBrowserHistory(),
  basepath: import.meta.env.PROD ? void 0 : "/react-tailwindcss",
});
