import style from "./home.module.scss";
import { useClass } from "@/hook";
import { Card, Form, Layout, List } from "antd";
import { DarkSwitch } from "@/component";
import { NavLink } from "react-router-dom";
const cN = useClass(style);

function Home() {
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
            <NavLink to="/particle">粒子</NavLink>
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
            <DarkSwitch />
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

export default Home;
