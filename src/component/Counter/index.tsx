import style from "./counter.module.scss";
import { Card, Button, Divider, Space } from "antd";
import { useClass } from "@/hook";
import React, { useState, useMemo, useCallback } from "react";
const cx = useClass(style);
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
  const [count, setCount] = useState(0);
  const provide = useMemo(() => ({ count, setCount }), [count, setCount]);
  const countAdd = useCallback(() => setCount((prev) => prev + 1), []);
  const resetCount = useCallback(() => setCount((prev) => 1), []);
  return (
    <Card title="计算器">
      <h2>当前计数：{count || 0}</h2>
      <Divider>华丽的分隔线</Divider>
      <Space>
        <Button onClick={countAdd} type="primary">
          +1
        </Button>
        <Button onClick={resetCount} type="primary" danger>
          =1
        </Button>
      </Space>
      <Divider>华丽的分隔线</Divider>
      <MyContext.Provider value={provide}>{props.children}</MyContext.Provider>
    </Card>
  );
}
