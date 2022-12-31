import useClass from "@/hook/useClass";
import React, { HTMLAttributes, useImperativeHandle } from "react";
import style from "./show.module.scss";
import { useParams, useLocation, useMatch, Outlet } from "react-router-dom";
import { Button, Divider } from "antd";
import { loginoutAct } from "@/redux/slice/slice-auth";
import { useDispatch } from "react-redux";
const cN = useClass(style);
export namespace Type {
  export interface Props extends HTMLAttributes<HTMLDivElement> {}
  export interface Ref {}
}
export default React.forwardRef<Type.Ref, Type.Props>((props, ref) => {
  useImperativeHandle(ref, () => {
    return {};
  });
  const dispatch = useDispatch();
  const params = useParams();
  console.log("params", params);
  const location = useLocation();
  console.log("location", location);
  const match = useMatch("/show/:id");
  console.log("match", match);
  return (
    <div className={cN("p-1")}>
      <h1>Show页面</h1>
      <Button
        onClick={() => dispatch(loginoutAct())}
        danger
      >
        loginout
      </Button>
      <Divider>子路由</Divider>
      <div className={cN("flex center-center")}>
        <Outlet></Outlet>
      </div>
    </div>
  );
});
