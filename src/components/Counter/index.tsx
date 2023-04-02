import { Card, Button, Divider, Space } from "antd";
import React, { useState } from "react";

const arr: string[] = [];

export function Counter(props: React.PropsWithChildren) {
  const { children, ...restProps } = props;
  const [count, setCount] = useState(0);
  console.log("Counter 组件更新");
  return (
    <Card title={"当前计数：" + count} hoverable>
      <Space wrap>
        <Button onClick={() => setCount((prev) => prev + 1)}>+1</Button>
        <Button onClick={() => setCount(1)} danger>
          =1
        </Button>
        <Button onClick={() => console.log(arr)}>log</Button>
        <Button onClick={() => arr.push(crypto.randomUUID())}>push</Button>
      </Space>
      <Divider />
      {children}
    </Card>
  );
}
