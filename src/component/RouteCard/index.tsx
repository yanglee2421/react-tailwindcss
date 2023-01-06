import { NavLink, useNavigate } from "react-router-dom";
import { Button, Card, Space } from "antd";
import { routes } from "@/route/routes";
import React, { useCallback } from "react";
/**
 * 路由卡片
 * @returns JSX
 */
export function RouteCard() {
  return (
    <Card title="路由卡片">
      <RouteBtn />
    </Card>
  );
}
/**
 * 路由按钮组件
 * @returns Space 包裹的 Button 数组
 */
export function RouteBtn(props: React.PropsWithChildren) {
  // 有 "/" 直接返回，没有则加上
  const toPath = useCallback((path: string) => {
    return path.includes("/") ? path : `/${path}`;
  }, []);
  // 遍历 routes 生成 JSX[]
  const node = routes.map((route, index) => {
    const isHasTitle = typeof route.handle?.title === "string";
    if (!isHasTitle) return null;
    if (!route.path) return null;
    return (
      <NavLink to={toPath(route.path)} key={index}>
        <Button type="primary">{route.handle.title}</Button>
      </NavLink>
    );
  });
  return (
    <Space wrap>
      {node}
      <BackBtn />
    </Space>
  );
}
/**
 * 返回按钮组件
 * @returns JSX
 */
export function BackBtn() {
  // 最后返回按钮
  const navigate = useNavigate();
  const retBtn = useCallback(() => navigate(-1), []);
  return (
    <Button onClick={retBtn} type="primary" danger>
      返回
    </Button>
  );
}
