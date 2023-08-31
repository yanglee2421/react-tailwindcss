// Router Imports
import { RouterProvider } from "react-router-dom";
import { router } from "@/routers";

// Provider Imports
import { ThemeProvider } from "@/themes";
import { ReduxProvider } from "@/redux";
import { QueryProvider } from "@/api/provider";
import { AclProvider } from "@/configs/acl";

export function App() {
  return (
    <ReduxProvider>
      <QueryProvider>
        <AclProvider>
          <ThemeProvider>
            <RouterProvider router={router} />
          </ThemeProvider>
        </AclProvider>
      </QueryProvider>
    </ReduxProvider>
  );
}
