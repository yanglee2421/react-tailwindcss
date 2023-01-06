import style from "./counter.module.scss";
import { Card, Button, Divider, Space } from "antd";
import { useClass } from "@/hook";
import React, { useState, useMemo } from "react";
const cN = useClass(style);
const MyContext = React.createContext({});
/**
 * @function Counter 使用的类型
 */
export namespace Type {
  export interface props extends React.PropsWithChildren {}
}
/**
 * Counter 组件
 * @returns JSX
 */
export function Counter(props: Type.props) {
  const [count, setCount] = useState(0);
  const provide = useMemo(() => ({ count, setCount }), [count, setCount]);
  return (
    <Card
      title="计算器"
      className={cN("m-1")}
    >
      <h2>当前计数：{count || 0}</h2>
      <Divider>华丽的分隔线</Divider>
      <Space>
        <Button
          onClick={(e) => setCount((prev) => prev + 1)}
          type="primary"
        >
          +1
        </Button>
        <Button
          onClick={(e) => setCount((prev) => 1)}
          type="dashed"
        >
          =1
        </Button>
      </Space>
      <MyContext.Provider value={provide}>{props.children}</MyContext.Provider>
    </Card>
  );
}
