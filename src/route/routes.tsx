import { Navigate, RouteObject } from "react-router-dom";
import { Card, Button } from "antd";
import { useImp } from "@/hook";
const routes: RouteObject[] = [
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
  },
  { path: "login", element: useImp(() => import("@/page/login")) },
  { path: "table", element: useImp(() => import("@/page/table")) },
  { path: "threejs", element: useImp(() => import("@/page/threejs")) },
  { path: "particle", element: useImp(() => import("@/page/particle")) },
  { path: "firework", element: useImp(() => import("@/page/firework")) },
  { path: "demo", element: useImp(() => import("@/page/demo")) },
  // prettier-ignore
  { path: "*", element: <Navigate to="404" replace /> },
  { path: "404", element: useImp(() => import("@/page/404")) },
];
export default routes;
