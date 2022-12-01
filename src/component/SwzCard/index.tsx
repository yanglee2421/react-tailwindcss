import { forwardRef, ReactNode, useImperativeHandle } from "react";
import style from "./index.module.scss";
import useClass from "@/hook/useClass";
const cN = useClass(style);
// 类型
export namespace Type {
  export type Props = Partial<{
    children: ReactNode | ReactNode[];
    className: string;
    style: Record<string, string | number>;
  }>;
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
      {children}
    </div>
  );
});
