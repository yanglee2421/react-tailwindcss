import { NavLink, useMatches, useNavigate } from "react-router-dom";
import { Button, Card, Space } from "antd";
import type { ButtonProps, CardProps, SpaceProps } from "antd";
import { routes } from "@/route/routes";
import React, { useMemo } from "react";

export function RouteCard(props: CardProps) {
  const { children, ...restProps } = props;

  // 路由按钮
  const matches = useMatches();
  const routeBtns = useMemo(() => {
    const target = handleRoutes(routes);
    return target
      .flat(Infinity)
      .filter((route) => {
        const { handle, path } = route;
        const isHasTitle = typeof handle?.title === "string";
        const isNotCurrent = matches.at(1)?.pathname !== "/" + path;
        return isHasTitle && isNotCurrent;
      })
      .map((route, index) => (
        <NavLink key={index} to={"/" + route.path}>
          <Button>{route.handle.title}</Button>
        </NavLink>
      ));
  }, [matches]);

  // 渲染结果
  const navigate = useNavigate();
  return (
    <Card
      title="路由卡片"
      extra={
        <Button onClick={() => navigate(-1)} type="link">
          Go back
        </Button>
      }
      hoverable
      {...restProps}
    >
      <Space wrap>
        {routeBtns}
        {children}
      </Space>
    </Card>
  );
}

// 拍平routes
function handleRoutes(pArr: any[]) {
  const target = JSON.parse(JSON.stringify(pArr));
  fun(target);
  function fun(arr: typeof routes) {
    arr.forEach((item) => {
      Array.isArray(item.children) && fun(item.children);
      if (item.children) {
        target.push(item.children);
        delete item.children;
      }
    });
  }
  return target as typeof routes;
}
