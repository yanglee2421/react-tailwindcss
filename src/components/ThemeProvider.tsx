import {
  createTheme,
  CssBaseline,
  GlobalStyles,
  ThemeProvider as MuiThemeProvider,
} from "@mui/material";
import React from "react";

const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#6366f1",
    },
    text: {
      primary: "#0f172a",
      secondary: "#64748b",
    },
    background: {
      default: "#f4f4f5",
      paper: "#fafafa",
    },
  },

  spacing(abs: number) {
    return `${abs * 0.25}rem`;
  },
});

const globalStyles = {
  ".animate-spin": {
    animation: "spin 1s linear infinite",
  },
  "@keyframes spin": {
    from: {
      transform: "rotate(0deg)",
    },
    to: {
      transform: "rotate(360deg)",
    },
  },
};

export function ThemeProvider(props: React.PropsWithChildren) {
  return (
    <MuiThemeProvider theme={lightTheme}>
      {props.children}
      <CssBaseline />
      <GlobalStyles styles={globalStyles} />
    </MuiThemeProvider>
  );
}
