// Router Imports
import { Navigate, RouteObject } from "react-router-dom";

export const routes: RouteObject[] = [
  {
    path: "",
    lazy() {
      return import("./router-guard");
    },
    children: [
      { path: "*", element: <Navigate to="/404" replace /> },
      {
        id: "404",
        path: "404",
        handle: { title: "404, NotFound" },
        lazy() {
          return import("@/pages/404");
        },
      },
      {
        id: "login",
        path: "login",
        handle: { title: "登录" },
        lazy() {
          return import("@/pages/login");
        },
      },
      {
        id: "index",
        index: true,
        handle: { title: "首页" },
        lazy() {
          return import("@/pages/home");
        },
      },
      {
        id: "particle",
        path: "particle",
        handle: { title: "粒子" },
        lazy() {
          return import("@/pages/particle");
        },
      },
      {
        id: "snow",
        path: "snow",
        handle: { title: "雪飘" },
        lazy() {
          return import("@/pages/snow");
        },
      },
      {
        id: "form",
        path: "form",
        handle: { title: "表单" },
        lazy() {
          return import("@/pages/form");
        },
      },
      {
        id: "bottle",
        path: "bottle",
        handle: { title: "水罐" },
        lazy() {
          return import("@/pages/bottle");
        },
      },
      {
        id: "magnifier",
        path: "magnifier",
        handle: { title: "放大镜" },
        lazy() {
          return import("@/pages/magnifier");
        },
      },
      {
        id: "preformance",
        path: "preformance",
        handle: { title: "性能测试" },
        lazy() {
          return import("@/pages/preformance");
        },
      },
    ],
  },
];
