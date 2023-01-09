import style from "./home.module.scss";
import { NavLink } from "react-router-dom";
import { Card, Form, Layout, List } from "antd";
import {
  BgParticle,
  BingBtn,
  Counter,
  DarkSwitch,
  RouteCard,
  SignOut,
} from "@/component";
import { useClass } from "@/hook";
import React from "react";
const cN = useClass(style);
const BG = React.memo(BgParticle);
/**
 * 首页
 * @returns JSX
 */
export function PageHome() {
  return (
    <Layout className={cN("home p-1")}>
      <Counter />
      <RouteCard title="RouteCard" />
      <Card title="主题卡片">
        <Form>
          <Form.Item label="夜间模式">
            <DarkSwitch />
          </Form.Item>
          <Form.Item label="登出按钮">
            <SignOut type="primary" danger />
          </Form.Item>
          <Form.Item label="必应壁纸">
            <BingBtn />
          </Form.Item>
        </Form>
      </Card>
      <Card title="路由列表02">
        <List bordered>
          <List.Item>
            <NavLink to="/particle">粒子</NavLink>
          </List.Item>
          <List.Item>
            <NavLink to="/firework">烟花</NavLink>
          </List.Item>
          <List.Item>
            <NavLink to="/table">表格</NavLink>
          </List.Item>
        </List>
      </Card>
      <Card></Card>
      <Card></Card>
      <Card></Card>
    </Layout>
  );
}
export default React.memo(PageHome);
