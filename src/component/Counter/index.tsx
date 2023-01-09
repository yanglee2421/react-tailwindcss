import { Card, Button, Divider, Space } from "antd";
import React, { useState, useMemo, useCallback } from "react";
const MyContext = React.createContext({});
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
  const provide = useMemo(() => ({ count, setCount }), [count]);
  console.log("Counter 组件更新");
  const countAdd = useCallback(() => setCount((prev) => prev + 1), []);
  const resetCount = useCallback(() => setCount((prev) => 1), []);
  return (
    <Card title="CounterCard" {...restProps}>
      <h2>当前计数：{count || 0}</h2>
      <Divider />
      <Space>
        <Button onClick={countAdd}>+1</Button>
        <Button onClick={resetCount} danger>
          =1
        </Button>
      </Space>
      <Divider />
      <MyContext.Provider value={provide}>{children}</MyContext.Provider>
    </Card>
  );
}
