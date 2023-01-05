import { ConfigProvider, theme } from "antd";
import zhCN from "antd/es/locale/zh_CN";
// router
import { BrowserRouter } from "react-router-dom";
import Router from "@/route";
// redux
import { useAppDispatch, useAppSelector } from "@/redux";
import { isDarkAct } from "@/redux/slice-theme";
// hook
import { useDark } from "@/hook";
import { useMemo } from "react";

const { darkAlgorithm, defaultAlgorithm } = theme;

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
      <BrowserRouter basename="react">
        <Router />
      </BrowserRouter>
    </ConfigProvider>
  );
}

export default App;
