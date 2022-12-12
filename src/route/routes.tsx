import { Navigate, RouteObject } from "react-router-dom";
import { Home, Show, NotFound } from "@/page";
import { Card, Button } from "antd";
import Test from "@/test";
const routes: RouteObject[] = [
  { path: "/", element: <Home /> },
  {
    path: "show",
    element: <Show></Show>,
    children: [
      { path: "card", element: <Card title="嵌套路由"></Card> },
      { path: "button", element: <Button danger>嵌套路由</Button> },
    ],
  },
  { path: "test", element: <Test></Test> },
  { path: "404", element: <NotFound /> },
  { path: "*", element: <Navigate to="404" /> },
];
export default routes;
