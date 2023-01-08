import style from "./show.module.scss";
import { Divider, Layout, Space } from "antd";
import { DarkSwitch, SignOut } from "@/component";
import { useClass } from "@/hook";
import React from "react";
const cn = useClass(style);
/**
 * @function PageShow 使用的类型
 */
export namespace Type {
  export interface Props extends React.HTMLAttributes<HTMLDivElement> {}
  export interface Ref {}
}
/**
 * Show 页面
 */
export function PageShow() {
  return (
    <Layout className={cn("h-100 p-1")}>
      <Space>
        <SignOut />
        <DarkSwitch />
      </Space>
      <Divider>华丽的分隔线</Divider>
    </Layout>
  );
}
export default React.memo(PageShow);
