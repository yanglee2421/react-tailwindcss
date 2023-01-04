import { useClass } from "@/hook";
import React, { useImperativeHandle } from "react";
import style from "./show.module.scss";
const cN = useClass(style);
export namespace Type {
  export interface Props extends React.HTMLAttributes<HTMLDivElement> {}
  export interface Ref {}
}
export default React.forwardRef<Type.Ref, Type.Props>((props, ref) => {
  useImperativeHandle(ref, () => {
    return {};
  });
  return <div className={cN("p-1")}></div>;
});
