import { useMemo } from "react";
import { useSelector } from "react-redux";
import { useRoutes, useLocation, Navigate } from "react-router-dom";
import routes from "./routes";
const whiteList: string[] = ["/", "/login", "/404", "/test"];
export default () => {
  const location = useLocation();
  const routerElement = useRoutes(routes);
  const isLogined = useSelector<any, boolean>((state) => state.auth.isLogined);
  const resElement = useMemo(() => {
    if (whiteList.includes(location.pathname)) {
      return routerElement;
    }
    if (isLogined) return routerElement;
    // prettier-ignore
    return <Navigate to="login" replace />;
  }, [location, routerElement, isLogined]);
  return resElement;
};
