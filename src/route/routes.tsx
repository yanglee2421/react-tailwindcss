import { Navigate, RouteObject } from "react-router-dom";
import { Card, Button } from "antd";
import { useImp } from "@/hook";
export { whiteList } from "./whiteList";
export const routes: RouteObject[] = [
  {
    path: "/",
    element: useImp(() => import("@/page/home")),
    handle: { title: "首页" },
  },
  {
    path: "show",
    element: useImp(() => import("@/page/show")),
    children: [
      { path: "card", element: <Card title="嵌套路由"></Card> },
      { path: "button", element: <Button danger>嵌套路由</Button> },
    ],
    handle: { title: "展示" },
  },
  {
    path: "login",
    element: useImp(() => import("@/page/login")),
    handle: { title: "登录" },
  },
  {
    path: "table",
    element: useImp(() => import("@/page/table")),
    handle: { title: "表格" },
  },
  {
    path: "threejs",
    element: useImp(() => import("@/page/threejs")),
    handle: { title: "threejs" },
  },
  {
    path: "particle",
    element: useImp(() => import("@/page/particle")),
    handle: { title: "粒子" },
  },
  {
    path: "firework",
    element: useImp(() => import("@/page/firework")),
    handle: { title: "烟花" },
  },
  {
    path: "demo",
    element: useImp(() => import("@/page/demo")),
    handle: { title: "demo" },
  },
  // prettier-ignore
  { path: "*", element: <Navigate to="404" replace /> },
  {
    path: "404",
    element: useImp(() => import("@/page/404")),
    handle: { title: "404" },
  },
];
