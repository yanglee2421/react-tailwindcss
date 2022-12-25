import { useRoutes, useLocation, Navigate } from "react-router-dom";
import { useMemo } from "react";
import routes from "./routes";
import { useSelector } from "react-redux";
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
  }, [location, routerElement]);
  return resElement;
};
