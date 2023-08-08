// Router Imports
import { RouterProvider } from "react-router-dom";
import { router } from "@/routers";

// Provider Imports
import { ThemeProvider } from "@/themes";
import { ReduxProvider } from "@/redux";
import { QueryProvider } from "@/api/provider";

// Toast Imports
import { Toaster } from "react-hot-toast";

// MUI Imports
import { CssBaseline } from "@mui/material";

export function App() {
  return (
    <ReduxProvider>
      <QueryProvider>
        <ThemeProvider>
          <Toaster />
          <CssBaseline />
          <RouterProvider router={router} />
        </ThemeProvider>
      </QueryProvider>
    </ReduxProvider>
  );
}
