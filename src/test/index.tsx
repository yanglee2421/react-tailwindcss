import { useClass } from "@/hook";
import style from "./test.module.scss";
// component
import { Button, Card, Divider, Layout, message, Space } from "antd";
import { Counter, DarkSwitch } from "@/component";
// api
import request from "@/api/request";
// react
import { useCallback } from "react";
import { NavLink } from "react-router-dom";
const cN = useClass(style);
export default () => {
  const login = useCallback(() => {
    request<{ isOk: boolean; res: string }>({
      url: "/auth/login",
      method: "post",
      data: { user: "admin", pwd: "admin" },
    }).then((res) => {
      const { isOk, res: string } = res;
      if (isOk) {
        localStorage.setItem("token", string);
        message.success("登录成功");
        return;
      }
      message.warning("登录失败");
    });
  }, []);
  const download = useCallback(() => {
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
  }, []);

  return (
    <Layout className={cN("root p-1")}>
      <Card>
        <Counter>
          <hr className="my-1" />
          <Space>
            <DarkSwitch />
            <Button
              onClick={login}
              type="dashed"
              danger
            >
              登录
            </Button>
            <Button
              onClick={download}
              type="default"
            >
              下载
            </Button>
            <NavLink to="/threejs">
              <Button type="primary">threejs</Button>
            </NavLink>
            <NavLink to="/">
              <Button type="ghost">首页</Button>
            </NavLink>
            <NavLink to="/404">
              <Button type="link">404</Button>
            </NavLink>
            <NavLink to="/table">
              <Button type="text">table</Button>
            </NavLink>
          </Space>
        </Counter>
      </Card>
      <Divider>华丽的分隔线</Divider>
      <Card>
        <div
          className={cN("b m-2 ")}
          style={{ height: 300 }}
        >
          <div className={cN("test")}>今天</div>
        </div>
        <div
          className={cN("b m-2")}
          style={{ height: 300 }}
        >
          <div className={cN("test")}>昨天</div>
        </div>
        <div
          className={cN("b m-2")}
          style={{ height: 300 }}
        >
          <div className={cN("test")}>上周</div>
        </div>
        <div style={{ height: 50 }}></div>
      </Card>
    </Layout>
  );
};
