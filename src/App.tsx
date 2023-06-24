// Router Imports
import { RouterProvider } from "react-router-dom";
import { router } from "@/routes";

// Provider Imports
import { ThemeProvider } from "@/theme";
import { ReduxProvider } from "@/redux";
import { QueryProvider } from "@/api/provider";

export function App() {
  return (
    <QueryProvider>
      <ReduxProvider>
        <ThemeProvider>
          <RouterProvider router={router} />
        </ThemeProvider>
      </ReduxProvider>
    </QueryProvider>
  );
}
