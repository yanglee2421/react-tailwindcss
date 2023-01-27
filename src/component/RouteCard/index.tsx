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

  // 最后返回按钮
  const navigate = useNavigate();
  const bckHandler = useCallback(() => navigate(-1), []);
  const bckBtn = useMemo(
    () => (
      <Button onClick={bckHandler} danger>
        返回
      </Button>
    ),
    [bckHandler]
  );

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
  return (
    <Card title="路由卡片" {...restProps}>
      <Space wrap>
        {routeBtns}
        {bckBtn}
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
