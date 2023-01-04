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
export default () => {
  const isDark = useAppSelector((state) => state.theme.isDark);
  const dispatch = useAppDispatch();
  useDark((mediaQuery) => dispatch(isDarkAct(mediaQuery.matches)));
  return (
    <ConfigProvider
      locale={zhCN}
      theme={{
        algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm,
      }}
    >
      <BrowserRouter basename="react">
        <Router />
      </BrowserRouter>
    </ConfigProvider>
  );
};
