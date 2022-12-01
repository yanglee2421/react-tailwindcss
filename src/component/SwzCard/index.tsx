import { forwardRef, useImperativeHandle } from "react";
import type { HTMLAttributes } from "react";
import style from "./index.module.scss";
import useClass from "@/hook/useClass";
const cN = useClass(style);
// 类型
export namespace Type {
  export interface Props extends HTMLAttributes<HTMLDivElement> {}
  export interface Ref {
    name: string;
  }
}
// 组件
export default forwardRef<Type.Ref, Type.Props>((props, ref) => {
  const { children, className, ...attrs } = props;
  useImperativeHandle(ref, () => {
    return {
      name: "swz-card",
    };
  });
  return (
    <div
      {...attrs}
      className={cN("m-1 p-1 b shadow") + className}
    >
      <h1></h1>
      {children}
    </div>
  );
});
