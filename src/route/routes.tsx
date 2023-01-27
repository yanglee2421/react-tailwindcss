import { Navigate, RouteObject, useMatches, useOutlet } from "react-router-dom";
import { useLazy } from "@/hook";
import { useAppSelector } from "@/redux";
import { whiteList } from "./whiteList";
import { useEffect, useMemo } from "react";
export const routes: RouteObject[] = [
  {
    path: "",
    element: <AuthRoute />,
    children: [
      // #region
      { path: "*", element: <Navigate to="/404" replace /> },
      {
        path: "404",
        element: useLazy(() => import("@/page/404")),
        handle: { title: "404，找不到了" },
      },
      {
        path: "login",
        element: useLazy(() => import("@/page/login")),
        handle: { title: "登录" },
      },
      // #endregion
      {
        path: "",
        element: useLazy(() => import("@/page/layout")),
        children: [
          {
            path: "",
            element: useLazy(() => import("@/page/home")),
            handle: { title: "首页" },
          },
          {
            path: "threejs",
            element: useLazy(() => import("@/page/threejs")),
            handle: { title: "threejs" },
          },
          {
            path: "table",
            element: useLazy(() => import("@/page/table")),
            handle: { title: "表格" },
          },
        ],
      },
      {
        path: "particle",
        element: useLazy(() => import("@/page/particle")),
        handle: { title: "粒子" },
      },
      {
        path: "snow",
        element: useLazy(() => import("@/page/snow")),
        handle: { title: "雪飘" },
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
 * @returns routes中对应的element，或PageLogin
 */
function AuthRoute() {
  const matches = useMatches();
  const outlet = useOutlet();
  const isLogined = useAppSelector((state) => state.auth.isLogined);
  const routeRes = useMemo(() => {
    // 根据白名单的登录状态进行鉴权
    const isInWL = whiteList.includes(matches.at(1)?.pathname || "");
    if (isInWL) return outlet;
    if (isLogined) return outlet;
    return <Navigate to="login" replace />;
  }, [isLogined, matches, outlet]);
  // 路由后置钩子更改网页标题
  useEffect(() => {
    const title = (matches.at(-1)?.handle as any)?.title;
    if (!title) return;
    if (typeof title !== "string") return;
    document.title = title;
  }, [matches]);
  return routeRes;
}
