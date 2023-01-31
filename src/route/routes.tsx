import { Navigate, RouteObject, useMatches, useOutlet } from "react-router-dom";
import { useLazy } from "@/hook";
import { whiteList } from "./whiteList";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { message, Typography } from "antd";

// #region
export const routes: RouteObject[] = [
  {
    path: "",
    element: <AuthRoute />,
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
// #endregion

namespace t {
  interface state {
    isLogined: boolean;
    user: string;
    token: string;
    invalidTime: number;
  }
  export type signInParam = Omit<state, "isLogined">;
  export interface signInt {
    (state: signInParam, isRemember?: boolean): void;
  }
  export interface ctx {
    state: state;
    signIn: signInt;
    signOut(): void;
    prevAuth(): boolean;
  }
}

export const CtxAuth = React.createContext<t.ctx>(initCtx());

// CtxAuth的默认值
function initCtx() {
  const state = {
    isLogined: false,
    user: "",
    token: "",
    invalidTime: 0,
  };
  return {
    state,
    signIn() {},
    signOut() {},
    prevAuth() {
      return false;
    },
  };
}

// 鉴权组件
function AuthRoute() {
  // 处理登录信息
  const [state, setAuth] = useState(initCtx().state);
  function signOut() {
    setAuth((prev) => ({ ...prev, ...initCtx().state }));
    localStorage.removeItem("auth");
    localStorage.removeItem("token");
  }
  function signIn(
    { user, token, invalidTime }: t.signInParam,
    isRemember = false
  ) {
    const nextAuth = { isLogined: true, user, token, invalidTime };
    setAuth((prev) => ({ ...prev, ...nextAuth }));
    if (isRemember) {
      localStorage.setItem("auth", JSON.stringify(nextAuth));
      localStorage.setItem("token", token);
    }
    setTimeout(signOut, invalidTime - Date.now());
  }

  // 路由后置钩子更改网页标题
  const matches = useMatches();
  useEffect(() => {
    const title = (matches.at(-1)?.handle as any)?.title;
    if (!title) return;
    if (typeof title !== "string") return;
    document.title = title;
  }, [matches]);

  // 路由鉴权
  const outlet = useOutlet();
  const routeResult = useMemo(() => {
    const isInWL = whiteList.includes(matches.at(1)?.pathname || "");
    if (isInWL) return outlet;
    if (state.isLogined || prevAuth()) return outlet;
    return <Navigate to="login" replace />;
  }, [state, matches, outlet]);

  // 还原上次的state
  function prevAuth() {
    try {
      const prevJson = localStorage.getItem("auth");
      if (!prevJson) return false;

      const prevAuth = JSON.parse(prevJson);
      const { user, token, invalidTime } = prevAuth;
      if (!user || !token || !invalidTime)
        throw new Error("one or more fields are empty");
      if (typeof user !== "string")
        throw new Error("type error, field user is not a string");
      if (typeof token !== "string")
        throw new Error("type error,field token is not a string");
      if (typeof invalidTime !== "number")
        throw new Error("invalidTime isn`t a number");
      if (invalidTime - Date.now() < 1000 * 60 * 5)
        throw new Error("Login information has expired");

      signIn({ user, token, invalidTime });
      return true;
    } catch (err) {
      console.error(err);
      localStorage.removeItem("auth");
      localStorage.removeItem("token");
      message.warning("登录信息已失效");
    }
    return false;
  }

  return (
    <CtxAuth.Provider value={{ state, signIn, signOut, prevAuth }}>
      {routeResult}
    </CtxAuth.Provider>
  );
}
