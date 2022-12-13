import { useClass } from "@/hook";
import style from "./test.module.scss";
// component
import { Card, Button, message, Switch } from "antd";
import { Counter } from "@/component";
// api
import request from "@/api/request";
// reduex
import { useSelector, useDispatch } from "react-redux";
import { setIsDark } from "@/redux/slice/theme";
const cN = useClass(style);
export default () => {
  const isDark = useSelector<any, boolean>((state) => state.theme.isDark);
  const dispatch = useDispatch();
  const fun = (checked: boolean) => {
    dispatch(setIsDark(checked));
  };
  const login = () => {
    request<{ isPass: boolean; res: string }>({
      url: "/api/login",
      method: "post",
      data: { user: "admin", pwd: "admin" },
    }).then((res) => {
      const { isPass, res: string } = res;
      if (isPass) {
        localStorage.setItem("token", string);
        message.success("登录成功");
        return;
      }
      message.warning("登录失败");
    });
  };
  const download = () => {
    request<Blob>({
      url: "/file/pic-blob",
      responseType: "blob",
    }).then((res) => {
      const blob = new Blob([res], { type: "image/jpeg" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "123.jpg";
      a.click();
      URL.revokeObjectURL(url);
    });
  };

  return (
    <Card>
      <Counter>
        <Button
          onClick={login}
          danger
          className={cN("ml-1")}
        >
          登录
        </Button>
        <Button
          onClick={download}
          danger
          className={cN("ml-1")}
        >
          下载
        </Button>
        <Switch
          defaultChecked={isDark}
          onChange={fun}
        />
      </Counter>
    </Card>
  );
};
