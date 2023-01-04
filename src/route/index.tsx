import { useMemo } from "react";
import { useRoutes, useLocation, Navigate } from "react-router-dom";
import routes from "./routes";
import whiteList from "./whiteList";
import { useAppSelector } from "@/redux";

export default Router;

function Router() {
  const location = useLocation();
  const routerElement = useRoutes(routes);
  const isLogined = useAppSelector((state) => state.auth.isLogined);
  const resElement = useMemo(() => {
    if (whiteList.includes(location.pathname)) {
      return routerElement;
    }
    if (isLogined) return routerElement;
    // prettier-ignore
    return <Navigate to="login" replace />;
  }, [location, routerElement, isLogined]);
  return resElement;
}
