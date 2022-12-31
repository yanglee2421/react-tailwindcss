import svgSrc from "@/assets/react.svg";
import style from "./home.module.scss";
import useClass from "@/hook/useClass";
import { Card, Form, Layout, List, Switch } from "antd";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setIsDarkAct } from "@/redux/slice/slice-theme";
import { NavLink } from "react-router-dom";
const cN = useClass(style);
export default () => {
  const isDark = useSelector<any, boolean>((state) => state.theme.isDark);
  const dispatch = useDispatch();
  const swhChg = useCallback((swhVal: boolean) => {
    dispatch(setIsDarkAct(swhVal));
  }, []);
  return (
    <Layout className={cN("home")}>
      <Card title="路由列表">
        <List bordered>
          <List.Item>
            <NavLink to="/404">404</NavLink>
          </List.Item>
          <List.Item>
            <NavLink to="/threejs">threejs</NavLink>
          </List.Item>
          <List.Item>
            <NavLink to="/test">测试页</NavLink>
          </List.Item>
          <List.Item>
            <NavLink to="/table">表格</NavLink>
          </List.Item>
        </List>
      </Card>
      <Card></Card>
      <Card title="主题设置">
        <Form>
          <Form.Item label="夜间模式">
            <Switch
              defaultChecked={isDark}
              onChange={swhChg}
            />
          </Form.Item>
        </Form>
      </Card>
      <Card></Card>
      <Card></Card>
      <Card></Card>
      <Card></Card>
    </Layout>
  );
};
