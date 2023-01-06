import style from "./demo.module.scss";
import { Layout } from "antd";
import { useClass } from "@/hook";
import React from "react";
const cn = useClass(style);
/**
 * Demo 页面
 * @returns JSX
 */
export function PageDemo() {
  return <Layout></Layout>;
}

export default React.memo(PageDemo);
