import { useImport } from "@/hook";
import { useRoutes } from "react-router-dom";
import { Card } from "antd";
export default () =>
  useRoutes([
    { path: "/", element: useImport(() => import("@/page/home")) },
    {
      path: "show",
      element: useImport(() => import("@/page/show")),
      children: [{ path: "123", element: <Card title="嵌套路由"></Card> }],
    },
    { path: "*", element: useImport(() => import("@/page/404")) },
  ]);
