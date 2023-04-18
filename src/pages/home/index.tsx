import style from "./home.module.scss";
import { Card } from "antd";
import { useStyle } from "@/hooks";
import React, { useState } from "react";

/**
 * 首页
 * @returns JSX
 */
export default function PageHome() {
  const cx = useStyle(style);

  return (
    <div className={cx("home")}>
      <Card></Card>
    </div>
  );
}
