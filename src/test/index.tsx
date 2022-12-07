import { useClass } from "@/hook";
import style from "./test.module.scss";
import { Card, Button, message } from "antd";
import { createContext, useState } from "react";
import Child from "./child";
import request from "@/api/request";
const cN = useClass(style);
const MyContext = createContext({});
export default () => {
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
  const [count, setCount] = useState(0);
  return (
    <Card
      title={count || "0"}
      className={cN("m-1")}
    >
      <Button
        onClick={(e) => setCount((prev) => prev + 1)}
        type="primary"
      >
        +1
      </Button>
      <Button
        onClick={(e) => setCount((prev) => 1)}
        type="dashed"
        className={cN("ml-1")}
      >
        =1
      </Button>
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
      <MyContext.Provider value={{ count, setCount }}>
        <Child></Child>
      </MyContext.Provider>
    </Card>
  );
};
