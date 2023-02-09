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
  return <div className={cx("box")}></div>;
}
export default React.memo(PageDemo);
