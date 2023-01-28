import { Card, Button, Divider, Space } from "antd";
import React, { useState } from "react";
const arr: string[] = [];
/**
 * @function Counter 使用的类型
 */
export namespace Type {
  export interface props extends React.PropsWithChildren {}
}
/**
 * 计数器卡片
 * @returns JSX
 */
export function Counter(props: Type.props) {
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
