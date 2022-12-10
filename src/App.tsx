import { HashRouter } from "react-router-dom";
import { ConfigProvider, theme } from "antd";
import zhCN from "antd/locale/zh_CN";
import RouterGuard from "@/route";
import { useDark } from "@/hook";
import { useDispatch, useSelector } from "react-redux";
import { setIsDark } from "@/redux/slice/theme";
function App() {
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
      <HashRouter>
        <RouterGuard />
      </HashRouter>
    </ConfigProvider>
  );
}
export default App;
