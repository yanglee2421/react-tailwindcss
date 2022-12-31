import { useClass } from "@/hook";
import style from "./dialog.module.scss";
import { Modal } from "antd";
import React, { useImperativeHandle, useState } from "react";
const cn = useClass(style);
namespace type {
  export interface props {}
  export interface ref {}
}
export default React.forwardRef<type.ref, type.props>((props, ref) => {
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
