import { useRoutes } from "react-router-dom";
import { Card } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Home, Show, NotFound } from "@/page";
export default () => {
  const location = useLocation();
  const navigate = useNavigate();
  const routes = useRoutes([
    { path: "/", element: <Home /> },
    {
      path: "show",
      element: <Show />,
      children: [{ path: "123", element: <Card title="嵌套路由"></Card> }],
    },
    { path: "*", element: <NotFound /> },
  ]);
  useEffect(() => {
    console.log(location);
    if (location.pathname === "/show") {
      navigate("/404", { replace: true, state: {} });
    }
  }, [location, routes]);
  return routes || null;
};
