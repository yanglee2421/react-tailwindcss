// MUI Imports
import { ThemeProvider } from "@mui/material";

// Theme Imports
import { toThemeValue } from "./theme-utils";

// Redux Imports
import { useAppSelector } from "@/redux";

// React Imports
import React from "react";

export function ThemeProviderV2(props: React.PropsWithChildren) {
  // ** Props
  const { children } = props;

  // Redux Hooks
  const isDark = useAppSelector((s) => s.theme.isDark);
  const theme = toThemeValue({ isDark });

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
