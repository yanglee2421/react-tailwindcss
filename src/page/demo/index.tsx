import style from "./style.module.scss";
import React, {
  useCallback,
  useDeferredValue,
  useMemo,
  useRef,
  useState,
} from "react";
import { useClass, useObject } from "@/hook";
import { Button, Card, Switch } from "antd";
import { RestOutlined } from "@ant-design/icons";

export function PageDemo() {
  const cx = useClass(style);
  return (
    <div className={cx("box")}>
      <div className={cx("glass")}>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Excepturi,
        unde nihil? Error, ab. Expedita provident, culpa repellat esse ex a
        similique ea cumque fuga consequatur aliquam nisi aliquid nam
        architecto.
      </div>
      <div className={cx("grid")}>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Excepturi,
        unde nihil? Error, ab. Expedita provident, culpa repellat esse ex a
        similique ea cumque fuga consequatur aliquam nisi aliquid nam
        architecto.
      </div>
      <div className={cx("shadow")}>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Excepturi,
        unde nihil? Error, ab. Expedita provident, culpa repellat esse ex a
        similique ea cumque fuga consequatur aliquam nisi aliquid nam
        architecto.
      </div>
    </div>
  );
}
export default React.memo(PageDemo);
