import {
  Navigate,
  useMatches,
  useOutlet,
  RouteObject,
  useNavigate,
} from "react-router-dom";
import { useLazy } from "@/hook";
import { CtxAuth, initAuth } from "@/stores";
import React, { useEffect, useMemo, useState } from "react";
import { whiteList } from "./whiteList";
import { message } from "antd";

export const routes: RouteObject[] = [
  {
    path: "",
    element: <BeforeEach />,
    children: [
      { path: "*", element: <Navigate to="/404" replace /> },
      {
        path: "login",
        element: useLazy(() => import("@/page/login")),
        handle: { title: "登录" },
      },
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
            path: "404",
            element: useLazy(() => import("@/page/404")),
            handle: { title: "404，NotFound" },
          },
          {
            path: "form",
            element: useLazy(() => import("@/page/form")),
            handle: { title: "表单" },
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
        children: [
          {
            path: "card",
            element: <></>,
          },
        ],
      },
    ],
  },
];

/**
 * Executed before every route change
 * @returns router result
 */
function BeforeEach() {
  const navigate = useNavigate();
  const matches = useMatches();

  // 登录鉴权
  const [state, setState] = useState(initAuth().state);
  let timer: number | NodeJS.Timeout = 0;
  const signOut = () => {
    setState((prev) => ({ ...prev, ...initAuth().state }));
    clearTimeout(timer);
    localStorage.removeItem("auth");
    localStorage.removeItem("token");
  };
  const signIn: ReturnType<typeof initAuth>["signIn"] = (
    { user, token, expiration },
    isRemember = false
  ) => {
    const nextAuth = { user, token, expiration };
    setState((prev) => ({ ...prev, ...nextAuth }));
    if ((matches.at(-1)?.handle as any)?.title === "登录")
      React.startTransition(() => navigate("/", { replace: true }));
    clearTimeout(timer);
    timer = setTimeout(signOut, expiration - Date.now());
    if (isRemember) {
      localStorage.setItem("auth", JSON.stringify(nextAuth));
      localStorage.setItem("token", token);
    }
  };
  const preAuth = () => {
    try {
      const prevJson = localStorage.getItem("auth");
      if (!prevJson) return false;

      const prevAuth = JSON.parse(prevJson);
      const { user, token, expiration } = prevAuth;
      if (!user || !token || !expiration)
        throw new Error("one or more fields are empty");
      if (typeof user !== "string")
        throw new Error("type error, field user is not a string");
      if (typeof token !== "string")
        throw new Error("type error,field token is not a string");
      if (typeof expiration !== "number")
        throw new Error("expiration isn`t a number");
      if (expiration - Date.now() < 1000 * 60 * 5)
        throw new Error("Login information has expired");

      React.startTransition(() => signIn({ user, token, expiration }));
      return true;
    } catch (err) {
      console.error(err);
      localStorage.removeItem("auth");
      localStorage.removeItem("token");
      message.warning("登录信息已失效");
    }
    return false;
  };
  const isLogined = () => Boolean(state.expiration) || preAuth();

  //   路由鉴权
  const outlet = useOutlet();
  const route = useMemo(() => {
    const pathname = matches.at(-1)?.pathname || "";
    if (isInWl(pathname)) return outlet;
    if (isLogined()) return outlet;
    return <Navigate to="/login" replace />;
  }, [state, outlet, matches]);

  //   标题随动
  useEffect(() => {
    const title = (matches.at(-1)?.handle as any)?.title;
    if (typeof title !== "string") return;
    document.title = title;
  }, [route]);

  return (
    <CtxAuth.Provider value={{ state, signOut, signIn, isLogined }}>
      {route}
    </CtxAuth.Provider>
  );
}

/**
 * Tests if a pathname is in the whitelist
 * @param str current route`s pathname
 * @returns whether the pathname is in the whitelist
 */
function isInWl(str: string) {
  return whiteList.some((item) => str.startsWith(item));
}
