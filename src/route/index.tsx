import { useRoutes, useLocation, Navigate } from "react-router-dom";
import { useMemo } from "react";
import routes from "./routes";
const whiteList: string[] = ["/", "/login", "/404", "/test"];
export default () => {
  const routerElement = useRoutes(routes);
  const location = useLocation();
  const resElement = useMemo(() => {
    if (whiteList.includes(location.pathname)) {
      return routerElement;
    }
    // prettier-ignore
    return <Navigate to="login" replace />;
  }, [location, routerElement]);
  return resElement;
};
