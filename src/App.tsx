import { ConfigProvider, theme } from "antd";
import zhCN from "antd/es/locale/zh_CN";
import {
  BrowserRouter,
  HashRouter,
  BrowserRouterProps,
  HashRouterProps,
} from "react-router-dom";
import { useDark } from "@/hook";
import { useAppDispatch, useAppSelector, actIsDark } from "@/redux";
import { RouteElement } from "@/route";
import React, { useMemo } from "react";
/**
 * @function App 使用的类型
 */
export namespace Type {
  export type routerProps = BrowserRouterProps | HashRouterProps;
}
const { darkAlgorithm, defaultAlgorithm } = theme;
/**
 * 根据打包配置决定路由模式
 */
const isGitee = import.meta.env.MODE === "gitee";
const RouterMode = isGitee ? HashRouter : BrowserRouter;
const routerProps: Type.routerProps = {
  basename: isGitee ? undefined : "react",
};
/**
 * React App 的根组件
 * @returns AppJSX
 */
export function App() {
  // 根据 Browser 主题派发 actIsDark
  const dispatch = useAppDispatch();
  useDark((mediaQuery) => dispatch(actIsDark(mediaQuery.matches)));
  // 根据 store 中的 isDark 返回主题样式
  const isDark = useAppSelector((state) => state.theme.isDark);
  const algorithm = useMemo(
    () => (isDark ? darkAlgorithm : defaultAlgorithm),
    [isDark]
  );
  return (
    <ConfigProvider locale={zhCN} theme={{ algorithm }}>
      <RouterMode {...routerProps}>
        <RouteElement />
      </RouterMode>
    </ConfigProvider>
  );
}
