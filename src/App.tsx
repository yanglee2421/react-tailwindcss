import { ConfigProvider, theme } from "antd";
import zhCN from "antd/locale/zh_CN";
// router
import { BrowserRouter } from "react-router-dom";
import Router from "@/route";
// redux
import { useDispatch, useSelector } from "react-redux";
import { setIsDarkAct } from "@/redux/slice-theme";
// hook
import { useDark } from "@/hook";
export default () => {
  const isDark = useSelector<any, boolean>((state) => state.theme.isDark);
  const dispatch = useDispatch();
  useDark((mediaQuery) => dispatch(setIsDarkAct(mediaQuery.matches)));
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
