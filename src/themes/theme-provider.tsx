// Theme Imports
import { theme } from "./theme";

// React Imports
import React from "react";

// Redux Imports
// import {} from ''

// Antd Imports
import { ConfigProvider } from "antd";

export function ThemeProvider(props: React.PropsWithChildren) {
  // ** Props
  const { children } = props;

  // ** Theme
  const { darkAlgorithm, defaultAlgorithm } = theme;
  const algorithm = false ? darkAlgorithm : defaultAlgorithm;

  return <ConfigProvider theme={{ algorithm }}>{children}</ConfigProvider>;
}
