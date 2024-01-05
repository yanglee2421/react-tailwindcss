// React Imports
import React from "react";

// Antd Imports
import { ConfigProvider, theme } from "antd";
import zhCN from "antd/es/locale/zh_CN";
import { useIsDark } from "@/hooks/dom";

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
      {children}
    </ConfigProvider>
  );
}
