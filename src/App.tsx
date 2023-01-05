import { ConfigProvider, theme } from "antd";
import zhCN from "antd/es/locale/zh_CN";
// router
import {
  BrowserRouter,
  HashRouter,
  BrowserRouterProps,
  HashRouterProps,
} from "react-router-dom";
import Router from "@/route";
// redux
import { useAppDispatch, useAppSelector } from "@/redux";
import { isDarkAct } from "@/redux/slice-theme";
// hook
import { useDark } from "@/hook";
import { useMemo } from "react";

export namespace type {
  export type routerProps = BrowserRouterProps | HashRouterProps;
}
// 提取主题配置
const { darkAlgorithm, defaultAlgorithm } = theme;
/**
 * 根据打包配置选择路由
 */
const isGitee = import.meta.env.MODE === "gitee";
const RouterMode = isGitee ? HashRouter : BrowserRouter;
const routerProps: type.routerProps = {
  basename: isGitee ? undefined : "react",
};
// 根组件函数
function App() {
  // 根据 Browser 主题派发 isDarkAct
  const dispatch = useAppDispatch();
  useDark((mediaQuery) => dispatch(isDarkAct(mediaQuery.matches)));
  // 根据 store 中的 isDark 返回主题样式
  const isDark = useAppSelector((state) => state.theme.isDark);
  const algorithm = useMemo(
    () => (isDark ? darkAlgorithm : defaultAlgorithm),
    [isDark]
  );
  return (
    <ConfigProvider
      locale={zhCN}
      theme={{ algorithm }}
    >
      <RouterMode {...routerProps}>
        <Router />
      </RouterMode>
    </ConfigProvider>
  );
}

export default App;
