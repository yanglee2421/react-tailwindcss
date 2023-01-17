import { Navigate, RouteObject, useMatches, useOutlet } from "react-router-dom";
import { useLazy } from "@/hook";
import { useAppSelector } from "@/redux";
import { whiteList } from "./whiteList";
import { useEffect, useMemo } from "react";
export const routes: RouteObject[] = [
  {
    path: "/",
    element: <AuthRoute />,
    children: [
      {
        path: "",
        element: useLazy(() => import("@/page/home")),
        handle: { title: "首页" },
      },
      {
        path: "login",
        element: useLazy(() => import("@/page/login")),
        handle: { title: "登录" },
      },
      { path: "*", element: <Navigate to="/404" replace /> },
      {
        path: "404",
        element: useLazy(() => import("@/page/404")),
        handle: { title: "404，找不到了" },
      },
      {
        path: "show",
        element: useLazy(() => import("@/page/show")),
        handle: { title: "展示页" },
      },

      {
        path: "table",
        element: useLazy(() => import("@/page/table")),
        handle: { title: "表格" },
      },
      {
        path: "threejs",
        element: useLazy(() => import("@/page/threejs")),
        handle: { title: "threejs" },
      },
      {
        path: "particle",
        element: useLazy(() => import("@/page/particle")),
        handle: { title: "粒子" },
      },
      {
        path: "demo",
        element: useLazy(() => import("@/page/demo")),
        handle: { title: "demo" },
      },
    ],
  },
];
/**
 * 实现路由鉴权
 * @returns 通过时为 page，反之 PageLogin
 */
function AuthRoute() {
  const matches = useMatches();
  const outlet = useOutlet();
  const isLogined = useAppSelector((state) => state.auth.isLogined);
  // 根据白名单的登录状态进行鉴权
  const page = useMemo(() => {
    const { pathname } = matches[1];
    const isInWL = whiteList.includes(pathname);
    if (isInWL) return outlet;
    if (isLogined) return outlet;
    return <Navigate to="login" replace />;
  }, [isLogined, matches, outlet]);
  // 路由后置钩子更改网页标题
  useEffect(() => {
    const title = (matches[1].handle as any)?.title;
    const isHasTitle = typeof title === "string";
    if (isHasTitle) {
      document.title = title;
    }
  }, [matches]);
  return page;
}
