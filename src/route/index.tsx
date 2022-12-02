import { useRoutes, useLocation, useNavigate } from "react-router-dom";
import { message } from "antd";
import { useEffect } from "react";
import routes from "./routes";
export default () => {
  const currentElement = useRoutes(routes);
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    console.log(location);
    if (location.pathname === "/show") {
      message.warning("去不了");
      navigate("/404", { replace: true, state: { title: "404" } });
    }
    document.title = location.state?.title || "加载中...";
    return () => {
      // message.destroy();
    };
  }, [currentElement, location]);
  return currentElement || null;
};
