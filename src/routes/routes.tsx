import { Navigate, RouteObject } from "react-router-dom";
import React from "react";
import { Skeleton } from "antd";
import { BeforeEach } from "./BeforeEach";

export const routes: RouteObject[] = [
  {
    path: "",
    element: <BeforeEach />,
    children: [
      { path: "*", element: <Navigate to="/404" replace /> },
      {
        path: "login",
        element: toLazy(() => import("@/pages/login")),
        handle: { title: "登录" },
      },
      {
        path: "",
        element: toLazy(() => import("@/pages/layout")),
        children: [
          {
            path: "",
            element: toLazy(() => import("@/pages/home")),
            handle: { title: "首页" },
          },
          {
            path: "404",
            element: toLazy(() => import("@/pages/404")),
            handle: { title: "404，NotFound" },
          },
          {
            path: "particle",
            element: toLazy(() => import("@/pages/particle")),
            handle: { title: "粒子" },
          },
          {
            path: "snow",
            element: toLazy(() => import("@/pages/snow")),
            handle: { title: "雪飘" },
          },
          {
            path: "form",
            element: toLazy(() => import("@/pages/form")),
            handle: { title: "表单" },
          },
          {
            path: "bottle",
            element: toLazy(() => import("@/pages/bottle")),
            handle: { title: "水罐" },
          },
          {
            path: "magnifier",
            element: toLazy(() => import("@/pages/magnifier")),
            handle: { title: "放大镜" },
          },
          {
            path: "threejs",
            element: toLazy(() => import("@/pages/threejs")),
            handle: { title: "threejs" },
          },
          {
            path: "table",
            element: toLazy(() => import("@/pages/table")),
            handle: { title: "表格" },
          },
        ],
      },
      {
        path: "preformance",
        element: toLazy(() => import("@/pages/preformance")),
        handle: { title: "性能测试" },
      },
      {
        path: "Gpt",
        element: toLazy(() => import("@/pages/gpt")),
        handle: { title: "GPT Copywriting" },
      },
      {
        path: "sign",
        element: toLazy(() => import("@/pages/sign")),
        handle: { title: "Google Chrome Credential" },
        children: [
          {
            path: ":id",
            element: <>16513151313</>,
          },
        ],
      },
    ],
  },
];

/**
 * function to generate a auth
 * @param auth default for auth
 * @returns initial auth
 */
function toLazy(callback: Parameters<typeof React.lazy>[0]) {
  const Inner = React.lazy(callback);
  return (
    <React.Suspense fallback={<Skeleton active />}>
      <Inner />
    </React.Suspense>
  );
}
