import {
  ThemeProvider as MuiThemeProvider,
  createTheme,
  GlobalStyles,
} from "@mui/system";
import { ConfigProvider, theme } from "antd";
import zhCN from "antd/es/locale/zh_CN";
import React from "react";

import { useIsDark } from "@/hooks/dom/useIsDark";


export function ThemeProvider(props: React.PropsWithChildren) {
  const { children } = props;

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
          palette: {},
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
