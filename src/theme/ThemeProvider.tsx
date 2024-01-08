// React Imports
import React from "react";

// Antd Imports
import { ConfigProvider, theme } from "antd";
import zhCN from "antd/es/locale/zh_CN";

// Utils Imports
import { useIsDark } from "@/hooks/dom";

// MUI Imports
import {
  ThemeProvider as MuiThemeProvider,
  createTheme,
  GlobalStyles,
} from "@mui/system";

export function ThemeProvider(props: React.PropsWithChildren) {
  // ** Props
  const { children } = props;

  // ** Theme
  const isDark = useIsDark();

  return (
    <ConfigProvider
      theme={{
        algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm,
      }}
      locale={zhCN}
    >
      <MuiThemeProvider
        theme={createTheme({
          spacing(factor: number) {
            return `${0.25 * factor}rem`;
          },
        })}
      >
        {children}
        <GlobalStyles
          styles={{
            "#nprogress .bar": {
              position: "fixed",
              left: 0,
              top: 0,
              zIndex: 2000,

              width: "100%",
              height: "3px",

              backgroundColor: "blue",
            },

            "#root": {
              height: "100%",
            },
          }}
        ></GlobalStyles>
      </MuiThemeProvider>
    </ConfigProvider>
  );
}
