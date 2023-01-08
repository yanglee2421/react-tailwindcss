import style from "./demo.module.scss";
import { Button, Card, Input, Layout, Space, Spin } from "antd";
import { useClass } from "@/hook";
import React, { useCallback, useState, useTransition } from "react";
const cx = useClass(style);
/**
 * Demo 页面
 * @returns JSX
 */
export function PageDemo() {
  const [isPending, startTransition] = useTransition();
  const [count, setCount] = useState(0);
  const [value, setValue] = useState("");
  const handler = useCallback<React.ChangeEventHandler<HTMLInputElement>>(
    (e) => {
      setValue((prev) => e.target.value.trim());
      startTransition(() => {
        setCount((prev) => {
          const begin = Date.now();
          while (true) {
            if (Date.now() - begin > 1000) {
              break;
            }
          }
          return prev + 1;
        });
      });
    },
    [count]
  );
  return (
    <Layout className={cx("h-100 p-1")}>
      <Card title="useTransition">
        <Space>
          <Button danger>{count}</Button>
          <Input value={value} onChange={handler} />
        </Space>
      </Card>
      {isPending && <Spin tip="count 更新中。。。" />}
    </Layout>
  );
}

export default React.memo(PageDemo);
