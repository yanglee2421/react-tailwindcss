import style from "./404.module.scss";
import { NavLink, useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  Col,
  Divider,
  Empty,
  Form,
  Layout,
  Row,
  Space,
} from "antd";
import { Counter, DarkSwitch } from "@/component";
import { useClass } from "@/hook";
import React, { useCallback, useState } from "react";
const cN = useClass(style);
/**
 * 404 页面
 * @returns JSX
 */
export function Page404() {
  const navigate = useNavigate();
  const retBtn = useCallback(() => navigate(-1), []);
  const [isShow, setIsShow] = useState(false);
  return (
    <Layout className={cN("p-1")}>
      <h1 className={cN("text-danger")}>404</h1>
      <p className={cN("text-info")}>很遗憾，这里什么也没有...</p>
      <Divider>华丽的分隔线</Divider>
      <Row gutter={10}>
        <Col span={12}>
          <Card title="主题">
            <Form>
              <Form.Item label="夜间模式">
                <DarkSwitch />
              </Form.Item>
            </Form>
          </Card>
        </Col>
        <Col span={12}>
          <Card title="路由">
            <Space>
              <NavLink to="/">
                <Button>首页</Button>
              </NavLink>
              <Button onClick={retBtn}>返回</Button>
              <NavLink to="/firework">
                <Button>烟花</Button>
              </NavLink>
              <NavLink to="/table">
                <Button>table</Button>
              </NavLink>
              <NavLink to="/threejs">
                <Button>threejs</Button>
              </NavLink>
            </Space>
          </Card>
        </Col>
      </Row>
      <Divider>华丽的分隔线</Divider>
      <Row gutter={10}>
        <Col span={12}>
          <Counter />
        </Col>
        <Col span={12}>
          {" "}
          <Card title="弹窗">
            <Button
              onClick={() => setIsShow(() => true)}
              type="link"
            >
              打开
            </Button>
          </Card>
        </Col>
      </Row>
      <Divider>华丽的分隔线</Divider>
      <Card>
        <Empty />
      </Card>
    </Layout>
  );
}

export default React.memo(Page404);
