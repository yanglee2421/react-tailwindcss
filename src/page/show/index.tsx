import useClass from "@/hook/useClass";
import { forwardRef, HTMLAttributes, useImperativeHandle } from "react";
import style from "./show.module.scss";
import {
  useParams,
  useLocation,
  useMatch,
  useNavigate,
  Outlet,
} from "react-router-dom";
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
  console.log("navigate", navigate);
  setTimeout(() => {
    navigate("/", {
      replace: true,
    });
  }, 5000);
  return (
    <div>
      <h1>Show</h1>
      <Outlet></Outlet>
    </div>
  );
});
