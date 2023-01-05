import { useClass } from "@/hook";
import React, { useImperativeHandle } from "react";
import style from "./show.module.scss";
import { Outlet } from "react-router-dom";
import { Divider, Layout, Space } from "antd";
import { DarkSwitch, SignOut } from "@/component";
const cn = useClass(style);
export namespace Type {
  export interface Props extends React.HTMLAttributes<HTMLDivElement> {}
  export interface Ref {}
}
export default React.forwardRef<Type.Ref, Type.Props>((props, ref) => {
  useImperativeHandle(ref, () => {
    return {};
  });
  return (
    <Layout className={cn("h-100 p-1")}>
      <Space>
        <SignOut />
        <DarkSwitch />
      </Space>
      <Divider>华丽的分隔线</Divider>
      <div>
        <Outlet></Outlet>
      </div>
    </Layout>
  );
});
