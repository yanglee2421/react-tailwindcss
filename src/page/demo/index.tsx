import style from "./demo.module.scss";
import { Avatar, Layout } from "antd";
import { UserOutlined } from "@ant-design/icons";
import avatar from "@/assets/image/avatar.jpg";
import { useClass, useResize } from "@/hook";
import React, { useId } from "react";
const cx = useClass(style);

/**
 * Demo 页面
 * @returns JSX
 */
export function PageDemo() {
  const uid = useId();
  const resizeRef = useResize(({ width }) => console.log(width), []);
  return (
    <Layout
      id={uid}
      ref={(e) => {
        const dom = document.getElementById(uid);
        // @ts-ignore
        resizeRef.current = dom;
      }}
      className="h-100"
    >
      <Layout.Header>
        <Avatar size={36} icon={<UserOutlined />} src={avatar} />
      </Layout.Header>
    </Layout>
  );
}

export default React.memo(PageDemo);
