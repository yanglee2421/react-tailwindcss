import { NavLink, useMatches, useNavigate } from "react-router-dom";
import { Button, Card, Space } from "antd";
import type { ButtonProps, CardProps, SpaceProps } from "antd";
import { routes } from "@/route/routes";
import React, { useCallback, useMemo } from "react";
/**
 * @function RouteCard 组件中使用的类型
 */
export namespace Type {
  export interface RouteCard extends CardProps {}
  export interface Space extends SpaceProps {}
  export interface BackBtn extends ButtonProps {}
}
/**
 * 路由卡片
 * @param props 同 CardProps
 * @returns JSX
 */
export function RouteCard(props: Type.RouteCard) {
  const { children, ...restProps } = props;
  return (
    <Card title="路由卡片" {...restProps}>
      <RouteBtn />
      {children}
    </Card>
  );
}
/**
 * 路由按钮组件
 * @param props 同 SpaceProps
 * @returns Space 包裹的 Button 数组
 */
export function RouteBtn(props: Type.Space) {
  const { children, ...restProps } = props;
  const matches = useMatches();

  // 遍历 routes 生成 JSX[]
  const btns = useMemo(
    () =>
      (routes.at(0)?.children || [])
        .filter((route) => matches.at(1)?.pathname !== "/" + route.path)
        .map((route, index) => {
          const isHasTitle = typeof route.handle?.title === "string";
          if (!isHasTitle) return null;
          return (
            <NavLink key={index} to={"/" + route.path}>
              <Button>{route.handle.title}</Button>
            </NavLink>
          );
        }),
    [matches]
  );

  return (
    <Space wrap {...restProps}>
      {btns}
      <BackBtn />
      {children}
    </Space>
  );
}
/**
 * 返回按钮组件，onClick 已占用
 * @param props 同 ButtonProps
 * @returns JSX
 */
export function BackBtn(props: Type.BackBtn) {
  const { children, ...restProps } = props;
  // 最后返回按钮
  const navigate = useNavigate();
  const retBtn = useCallback(() => navigate(-1), []);
  return (
    <Button danger {...restProps} onClick={retBtn}>
      {children || "返回"}
    </Button>
  );
}
