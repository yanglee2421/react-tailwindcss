import { useClass } from "@/hook";
import style from "./dialog.module.scss";
import { Modal } from "antd";
import React, { useImperativeHandle, useState } from "react";
const cn = useClass(style);
export namespace Type {
  export interface props {}
  export interface ref {}
}
export const Dialog = React.forwardRef<Type.ref, Type.props>((props, ref) => {
  const [isShow, setIsShow] = useState(true);
  useImperativeHandle(ref, () => {
    return {
      open() {
        setIsShow((prev) => true);
      },
    };
  });
  return (
    <Modal
      open={isShow}
      onCancel={() => setIsShow((prev) => false)}
    ></Modal>
  );
});
