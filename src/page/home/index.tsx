import style from "./home.module.scss";
import { NavLink } from "react-router-dom";
import { Card, Form, Layout, List } from "antd";
import {
  BgParticle,
  BingBtn,
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
    <BG className="h-100">
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
        <RouteCard title="RouteCard" />
        <Card title="主题卡片">
          <Form>
            <Form.Item label="夜间模式">
              <DarkSwitch />
            </Form.Item>
            <Form.Item label="登出按钮">
              <SignOut danger />
            </Form.Item>
            <Form.Item label="必应壁纸">
              <BingBtn type="primary" />
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
    </BG>
  );
}
export default React.memo(PageHome);
