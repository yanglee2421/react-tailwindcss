import style from "./demo.module.scss";
import { Avatar, Button, Card, Layout } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { BingBtn, Counter, DarkSwitch } from "@/component";
import { useClass, useResize } from "@/hook";
import React, { useId, useMemo, useState } from "react";
import avatar from "@/assets/image/avatar.jpg";
const cx = useClass(style);
const CounterMemo = React.memo(Counter);
/**
 * Demo 页面
 * @returns JSX
 */
export function PageDemo() {
  const uid = useId();
  const resizeRef = useResize(({ width }) => console.log(width), []);
  const [count, setCount] = useState(0);
  // const isDark = useAppSelector((state) => state.theme.isDark);
  const couters = useMemo(() => <Counter />, []);

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
      <Layout.Header className={cx("box-hd")}>
        <DarkSwitch />
        <BingBtn />
        <Avatar size={36} icon={<UserOutlined />} src={avatar} />
      </Layout.Header>
      <Layout.Content className={cx("box-cnt")}>
        {/* @ts-ignore */}
        <CounterMemo xxx={{ couters }}></CounterMemo>
        <Card title={count}>
          <Button onClick={() => setCount((prev) => prev + 1)}>+1</Button>
        </Card>
      </Layout.Content>
    </Layout>
  );
}

export default React.memo(PageDemo);
