// Router Imports
import { RouterProvider } from "react-router-dom";
import { router } from "@/routes";

// Provider Imports
import { ThemeProvider } from "@/theme";
import { ReduxProvider } from "@/redux";
import { QueryProvider } from "@/api/provider";

export function App() {
  return (
    <ReduxProvider>
      <QueryProvider>
        <ThemeProvider>
          <RouterProvider router={router} />
        </ThemeProvider>
      </QueryProvider>
    </ReduxProvider>
  );
}
