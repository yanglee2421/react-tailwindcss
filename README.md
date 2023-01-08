# 2023：React 路由鉴权、随路由修改网页标题

## data Router

1. react 路由有三种写法：传统组件法、useRoutes 法、data Router 法
2. 官方推荐的写法是 data Router
3. 这里用 data Router
4. route 的 handle 类似 vue-router 中的 meta
5. handle 属性仅在 data Router 下有效
6. 获取 handle 的 useMatches 只能在 data Router 下调用

```tsx
// routes.tsx
import { createBrowserRouter, Navigate } from "react-router-dom";
import { PageIndex } from "@/page";
export const router = createBrowserRouter([
  {
    // 确保所有的路由都走 AuthRoute 组件
    path: "/",
    // 这个组件做鉴权和处理标题
    element: <AuthRoute />,
    // 真正的网页
    children: [
      { path: "", element: <PageIndex />, handle: { title: "首页" } },
      { path: "login", element: <PageLogin />, handle: { title: "登录页" } },
      // 没有匹配到的路由重定向到 404
      { path: "*", element: <Navigate to="404" replace /> },
      { path: "404", element: <Page404 />, handle: { title: "404页" } },
    ],
  },
]);
// App.jsx
import { RouterPrivider } from "react-router-dom";
import { router } from "./routes";
export function App() {
  return <RouterProvider router={router} />;
}
```

## 鉴权 & 网页标题

1. 所有路由变化都会触发 AuthRoute 的更新
2. 通过 AuthRoute 返回值控制路由的结果

```tsx
// route/index.ts
/**
 * 实现路由鉴权，并根据路由修改网页标题
 * @returns 通过时为 page，反之 PageLogin
 */
function AuthRoute() {
  /**
   * 1.获取路由匹配信息
   * 2.获取子路由 JSX
   * 3.获取 store 中的登录信息
   */
  const matches = useMatches(); //这个钩子只有 data Router 下能用
  const outlet = useOutlet();
  const isLogined = useAppSelector((state) => state.auth.isLogined);
  /**
   * 当前路径是否在白名单？
   * 当前是否已登录？
   * 都不是则重向定到 PageLogin
   */
  const page = useMemo(() => {
    const { pathname } = matches[1];
    const isInWL = whiteList.includes(pathname);
    if (isInWL) return outlet;
    if (isLogined) return outlet;
    return <Navigate to="login" replace />;
  }, [isLogined, matches, outlet]);
  /**
   * 模仿 vue-router 后置钩子修改网页标题
   */
  useEffect(() => {
    const title = (matches[1].handle as any)?.title;
    const isHasTitle = typeof title === "string";
    if (isHasTitle) {
      document.title = title;
    }
  }, [matches]);
  return page;
}
```

## 懒加载

1. vue-router 里的 component 可以直接写成一个回调实现懒加载
2. 但是 react-router 没有，需要我们自己写 hook

```tsx
// useLazy.tsx
import { Skeleton } from "antd";
import React from "react";
/**
 * @function useResize 使用的类型
 */
export namespace Type {
  export type defRC = {
    default: React.ComponentType<any>;
  };
}
/**
 * 类似 React.lazy，实现组件懒加载
 * @param callback 返回 Promise 的函数
 * @returns JSX
 */
export function useLazy(callback: () => Promise<Type.defRC>) {
  const LazyRC = React.lazy(callback);
  return (
    <React.Suspense fallback={<Skeleton active />}>
      <LazyRC />
    </React.Suspense>
  );
}
```

- 用上 hook 后，route 的写法

```tsx
// routes.tsx
import { Navigate, RouteObject } from "react-router-dom";
export const routes: RouteObject[] = [
  {
    path: "/home",
    element: useLazy(() => import("@/page/home")),
  },
];
```
