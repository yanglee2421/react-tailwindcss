import { Navigate, useMatches, useOutlet, RouteObject } from "react-router-dom";
import React, { useEffect, useMemo } from "react";
import { whiteList } from "./whiteList";
import { Skeleton } from "antd";
import { useAppSelector } from "@/redux";

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
        path: "demo",
        element: toLazy(() => import("@/pages/demo")),
        handle: { title: "demo" },
        children: [{ path: "card", element: <></> }],
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
    ],
  },
];

/**
 * Executed before every route change
 * @returns router result
 */
function BeforeEach() {
  const matches = useMatches();

  // Login status
  const auth = useAppSelector((state) => state.auth);

  // return routing result
  const outlet = useOutlet();
  const route = useMemo(() => {
    const isLogined = Boolean(auth.expiration);
    const pathname = matches.at(-1)?.pathname || "";
    if (pathname === "/login")
      return isLogined ? <Navigate to="/" replace /> : outlet;
    if (isInWl(pathname)) return outlet;
    if (isLogined) return outlet;
    return <Navigate to="/login" replace />;
  }, [auth, outlet, matches]);

  // title follows route
  useEffect(() => {
    const title = (matches.at(-1)?.handle as any)?.title;
    if (typeof title === "string") document.title = title;
  }, [matches]);

  return <>{route}</>;
}

/**
 * Tests if a pathname is in the whitelist
 * @param path current route`s pathname
 * @returns whether the pathname is in the whitelist
 */
function isInWl(path: string) {
  return whiteList.some((item) => path.startsWith(item));
}

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
