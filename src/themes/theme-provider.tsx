// React Imports
import React from "react";

// Redux Imports
import { useAppSelector } from "@/redux";

// Antd Imports
import { ConfigProvider, theme } from "antd";
import zhCN from "antd/es/locale/zh_CN";

export function ThemeProvider(props: React.PropsWithChildren) {
  // ** Props
  const { children } = props;

  // ** Theme
  const isDark = useAppSelector((s) => s.theme.isDark);
  const { darkAlgorithm, defaultAlgorithm } = theme;
  const algorithm = isDark ? darkAlgorithm : defaultAlgorithm;

  return (
    <ConfigProvider theme={{ algorithm }} locale={zhCN}>
      {children}
    </ConfigProvider>
  );
}
