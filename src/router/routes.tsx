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
        id: "401",
        path: "401",
        handle: {
          title: "401 Unauthorized",
          auth: "guest",
        },
        async lazy() {
          const { Unauthorized } = await import("@/pages/401");

          return {
            Component: Unauthorized,
          };
        },
      },
      {
        id: "403",
        path: "403",
        handle: {
          title: "403 Forbidden",
          auth: "auth",
        },
        async lazy() {
          const { Forbidden } = await import("@/pages/403");

          return {
            Component: Forbidden,
          };
        },
      },
      {
        id: "404",
        path: "404",
        handle: {
          title: "404 Not Found",
          auth: "none",
        },
        async lazy() {
          const { NotFound } = await import("@/pages/404");

          return {
            Component: NotFound,
          };
        },
      },
      {
        id: "500",
        path: "500",
        handle: {
          title: "Internal Server Error",
          auth: "none",
        },
        async lazy() {
          const { NotFound } = await import("@/pages/404");

          return {
            Component: NotFound,
          };
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
