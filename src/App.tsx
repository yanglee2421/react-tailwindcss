// Router Imports
import { RouterProvider } from "react-router-dom";
import { router } from "@/router";

// Provider Imports
import { ThemeProvider } from "@/theme";
import { QueryProvider } from "@/api/provider";
import { AclProvider } from "@/configs/acl";

export function App() {
  return (
    <QueryProvider>
      <AclProvider>
        <ThemeProvider>
          <RouterProvider router={router} />
        </ThemeProvider>
      </AclProvider>
    </QueryProvider>
  );
}
