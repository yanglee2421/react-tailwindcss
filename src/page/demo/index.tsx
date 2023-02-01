import style from "./demo.module.scss";
import { Avatar, Button, Card, Image, Layout } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { BingBtn, Counter, DarkSwitch } from "@/component";
import { useClass, useResize } from "@/hook";
import React, { useId, useMemo, useState } from "react";
import avatar from "@/assets/image/avatar.jpg";
import src from "@/assets/image/snow-night.jpg";

const CounterMemo = React.memo(Counter);

/**
 * Demo 页面
 * @returns JSX
 */
export function PageDemo() {
  const cx = useClass(style);
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
      className={cx("box")}
    >
      <div className={cx("bottle")}>
        <div className={cx("water")}></div>
      </div>
      <div className={cx("bottle-bottom")}></div>
    </Layout>
  );
}

export default React.memo(PageDemo);
