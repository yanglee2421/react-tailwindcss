import useClass from "@/hook/useClass";
import {
  forwardRef,
  HTMLAttributes,
  Suspense,
  useImperativeHandle,
} from "react";
import style from "./show.module.scss";
import {
  useParams,
  useLocation,
  useMatch,
  useNavigate,
  Outlet,
} from "react-router-dom";
import { Divider } from "antd";
const cN = useClass(style);
export namespace Type {
  export interface Props extends HTMLAttributes<HTMLDivElement> {}
  export interface Ref {}
}
export default forwardRef<Type.Ref, Type.Props>((props, ref) => {
  useImperativeHandle(ref, () => {
    return {};
  });
  const params = useParams();
  console.log("params", params);
  const location = useLocation();
  console.log("location", location);
  const match = useMatch("/show/:id");
  console.log("match", match);
  const navigate = useNavigate();
  return (
    <div className={cN("p-1")}>
      <h1>Show页面</h1>
      <Divider>子路由</Divider>
      <div className={cN("flex center-center")}>
        <Outlet></Outlet>
      </div>
    </div>
  );
});
