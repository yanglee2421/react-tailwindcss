// Router Imports
import { Navigate, RouteObject } from "react-router-dom";

export const routes: RouteObject[] = [
  {
    path: "",
    async lazy() {
      const { RootRoute } = await import("./RootRoute");

      return {
        Component: RootRoute,
      };
    },
    children: [
      { path: "*", element: <Navigate to="/404" replace /> },
      {
        id: "404",
        path: "404",
        handle: {
          title: "404, NotFound",
          auth: "none",
        },
        lazy() {
          return import("@/pages/404");
        },
      },
      {
        id: "login",
        path: "login",
        handle: {
          title: "Login",
          auth: "guest",
        },
        lazy() {
          return import("@/pages/login");
        },
      },
      {
        id: "index",
        index: true,
        handle: {
          title: "Home",
        },
        lazy() {
          return import("@/pages/home");
        },
      },
      {
        id: "particle",
        path: "particle",
        handle: { title: "Particle" },
        lazy() {
          return import("@/pages/particle");
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
    ],
  },
];
