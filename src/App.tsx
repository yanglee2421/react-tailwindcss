import { ConfigProvider, theme, App } from "antd";
import zhCN from "antd/locale/zh_CN";
// router
import { BrowserRouter } from "react-router-dom";
import Router from "@/route";
// redux
import { useDispatch, useSelector } from "react-redux";
import { setIsDark } from "@/redux/slice/theme";
// hook
import { useDark } from "@/hook";
export default () => {
  const isDark = useSelector<any, boolean>((state) => state.theme.isDark);
  const dispatch = useDispatch();
  useDark((mediaQuery) => dispatch(setIsDark(mediaQuery.matches)));
  return (
    <ConfigProvider
      locale={zhCN}
      theme={{
        algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm,
      }}
    >
      {/* <App key={1}> */}
      <BrowserRouter basename="react">
        <Router></Router>
      </BrowserRouter>
      {/* </App> */}
    </ConfigProvider>
  );
};
