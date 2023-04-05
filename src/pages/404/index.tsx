import style from "./404.module.scss";
import { useStyle } from "@/hooks";
import React from "react";

/**
 * 404 页面
 * @returns JSX
 */
export default function Page404() {
  const cx = useStyle(style);
  return <div className={cx("box")}></div>;
}
