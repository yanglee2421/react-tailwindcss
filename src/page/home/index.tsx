import style from "./home.module.scss";
import { NavLink } from "react-router-dom";
import { Card, Form, Layout, List } from "antd";
import { DarkSwitch, SignOut } from "@/component";
import { useClass } from "@/hook";
import React from "react";
const cN = useClass(style);
/**
 * 首页
 * @returns JSX
 */
export function PageHome() {
  return (
    <Layout className={cN("home")}>
      <Card title="路由列表01">
        <List bordered>
          <List.Item>
            <NavLink to="/404">404</NavLink>
          </List.Item>
          <List.Item>
            <NavLink to="/demo">demo</NavLink>
          </List.Item>
          <List.Item>
            <NavLink to="/show">show</NavLink>
          </List.Item>
          <List.Item>
            <NavLink to="/threejs">threejs</NavLink>
          </List.Item>
        </List>
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
      <Card title="主题设置">
        <Form>
          <Form.Item label="夜间模式">
            <DarkSwitch />
          </Form.Item>
          <Form.Item label="登出按钮">
            <SignOut />
          </Form.Item>
        </Form>
      </Card>
      <Card></Card>
      <Card></Card>
      <Card></Card>
      <Card></Card>
    </Layout>
  );
}

export default React.memo(PageHome);
