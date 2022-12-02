import { useClass } from "@/hook";
import { forwardRef, HTMLAttributes } from "react";
import { createPortal } from "react-dom";
import style from "./model.module.scss";
import { Card, Button } from "antd";
const cN = useClass(style);
export namespace Type {
  export interface Props extends HTMLAttributes<HTMLDivElement> {
    onClose?(): void;
  }
  export interface Ref extends HTMLDivElement {}
}
export default forwardRef<Type.Ref, Type.Props>((props, ref) => {
  const { onClose = () => {}, className, ...attrs } = props;
  return createPortal(
    <div
      {...attrs}
      className={cN("model-box") + className}
    >
      <Card
        title="弹框"
        className={cN("model-card")}
      >
        <Button
          onClick={onClose}
          danger
        >
          关闭
        </Button>
      </Card>
    </div>,
    document.querySelector("body")!
  );
});
