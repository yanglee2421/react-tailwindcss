import { Navigate, RouteObject } from "react-router-dom";
import { Card, Button } from "antd";
import { useImp } from "@/hook";
const routes: RouteObject[] = [
  { path: "/", element: useImp(() => import("@/page/home")) },
  {
    path: "show",
    element: useImp(() => import("@/page/show")),
    children: [
      { path: "card", element: <Card title="嵌套路由"></Card> },
      { path: "button", element: <Button danger>嵌套路由</Button> },
    ],
  },
  { path: "login", element: useImp(() => import("@/page/login")) },
  { path: "test", element: useImp(() => import("@/test")) },
  { path: "web3d", element: useImp(() => import("@/page/web3d")) },
  { path: "404", element: useImp(() => import("@/page/404")) },
  // prettier-ignore
  { path: "*", element: <Navigate to="404" replace /> },
];
export default routes;
