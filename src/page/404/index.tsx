import style from "./404.module.scss";
import { Card, Col, Divider, Empty, Form, Layout, Row } from "antd";
import { Counter, DarkSwitch, RouteCard } from "@/component";
import { useClass } from "@/hook";
import React, { useCallback, useEffect } from "react";
const cN = useClass(style);
/**
 * 404 页面
 * @returns JSX
 */
export function Page404() {
  return (
    <Layout className={cN("p-1")}>
      <h1 className={cN("text-danger")}>404</h1>
      <p className={cN("text-info")}>很遗憾，这里什么也没有...</p>
      <Divider>华丽的分隔线</Divider>
      <Row gutter={10}>
        <Col span={12}>
          <RouteCard></RouteCard>
        </Col>
        <Col span={12}>
          <Card title="主题">
            <Form>
              <Form.Item label="夜间模式">
                <DarkSwitch />
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
      <Divider>华丽的分隔线</Divider>
      <Counter />
      <Divider>华丽的分隔线</Divider>
      <Card>
        <Empty />
      </Card>
    </Layout>
  );
}

export default React.memo(Page404);
