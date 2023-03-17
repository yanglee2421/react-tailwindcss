import { Navigate, useMatches, useOutlet, RouteObject } from "react-router-dom";
import { useLazy } from "@/hook";
import { CtxAuth, initAuth } from "@/stores";
import React, { useEffect, useMemo, useReducer, useRef } from "react";
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
            path: "form",
            element: useLazy(() => import("@/page/form")),
            handle: { title: "表单" },
          },
          {
            path: "bottle",
            element: useLazy(() => import("@/page/bottle")),
            handle: { title: "水罐" },
          },
          {
            path: "magnifier",
            element: useLazy(() => import("@/page/magnifier")),
            handle: { title: "放大镜" },
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
        path: "demo",
        element: useLazy(() => import("@/page/demo")),
        handle: { title: "demo" },
        children: [{ path: "card", element: <></> }],
      },
      {
        path: "preformance",
        element: useLazy(() => import("@/page/preformance")),
        handle: { title: "性能测试" },
      },
      {
        path: "Gpt",
        element: useLazy(() => import("@/page/gpt")),
        handle: { title: "GPT Copywriting" },
      },
    ],
  },
];

type auth = ReturnType<typeof initAuth>["state"];
type signIn = ReturnType<typeof initAuth>["signIn"];
type reducer = (state: auth, act: (state: auth) => void) => auth;

/**
 * Executed before every route change
 * @returns router result
 */
function BeforeEach() {
  const matches = useMatches();

  // Login status
  const [state, setState] = useReducer<reducer, auth>(
    (state, act) => {
      try {
        const target = structuredClone(state);
        act(target);
        return target;
      } catch {
        throw new Error("structuredClone can`t handle this type");
      }
    },
    initAuth().state,
    init
  );

  // Auto Logout Timer
  const timer = useRef<number | NodeJS.Timeout>(0);

  // signOut & signIn
  const signOut = () => {
    clearTimeout(timer.current);
    localStorage.removeItem("auth");
    localStorage.removeItem("token");
    setState((prev) => Object.assign(prev, initAuth().state));
  };
  const signIn: signIn = ({ user, token, expiration }, isRemember = false) => {
    clearTimeout(timer.current);
    timer.current = setTimeout(signOut, expiration - Date.now());
    const nextAuth = { user, token, expiration };
    if (isRemember) {
      localStorage.setItem("auth", JSON.stringify(nextAuth));
      localStorage.setItem("token", token);
    }
    setState((prev) => Object.assign(prev, nextAuth));
  };

  // return routing result
  const outlet = useOutlet();
  const route = useMemo(() => {
    const isLogined = Boolean(state.expiration);
    const pathname = matches.at(-1)?.pathname || "";
    if (pathname === "/login")
      return isLogined ? <Navigate to="/" replace /> : outlet;
    if (isInWl(pathname)) return outlet;
    if (isLogined) return outlet;
    return <Navigate to="/login" replace />;
  }, [state, outlet, matches]);

  // title follows route
  useEffect(() => {
    const title = (matches.at(-1)?.handle as any)?.title;
    if (typeof title === "string") document.title = title;
  }, [matches]);

  return (
    <CtxAuth.Provider value={{ state, signIn, signOut }}>
      {route}
    </CtxAuth.Provider>
  );
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
function init(auth: auth) {
  try {
    const prevJson = localStorage.getItem("auth");
    if (!prevJson) return auth;

    const prevAuth = JSON.parse(prevJson);
    const { user, token, expiration } = prevAuth;
    if (!user || !token || !expiration)
      throw new TypeError("one or more fields are empty");
    if (typeof user !== "string")
      throw new TypeError("field user is not a string");
    if (typeof token !== "string")
      throw new TypeError("field token is not a string");
    if (typeof expiration !== "number")
      throw new TypeError("field expiration isn`t a number");
    if (expiration - Date.now() < 1000 * 60 * 5)
      throw new Error("Login information has expired");

    return { user, token, expiration };
  } catch (err) {
    console.error(err);
    localStorage.removeItem("auth");
    localStorage.removeItem("token");
    message.warning("登录信息已失效");
  }
  return auth;
}
