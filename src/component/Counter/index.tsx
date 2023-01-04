import { useClass } from "@/hook";
import style from "./counter.module.scss";
import { useState, useMemo, createContext, useEffect } from "react";
// components
import { Card, Button } from "antd";
import Child from "@/test/child";
export default Counter;
const cN = useClass(style);
// 向下传递上下文
const MyContext = createContext({});
// 组件函数
function Counter(props: any) {
  const [count, setCount] = useState(0);
  const [elesCount, setElseCount] = useState(0);
  const provide = useMemo(() => ({ count, setCount }), [count, setCount]);
  useEffect(() => {
    console.log("elseCount", elesCount);
  }, [count]);
  return (
    <Card
      title="计算器"
      className={cN("m-1")}
    >
      <h2>当前计数：{count || 0}</h2>
      <Button
        onClick={(e) => setCount((prev) => prev + 1)}
        type="primary"
      >
        +1
      </Button>
      <Button
        onClick={(e) => setElseCount((prev) => prev + 1)}
        danger
        className={cN("ml-1")}
      >
        elesCount+1
      </Button>
      <Button
        onClick={(e) => setCount((prev) => 1)}
        type="dashed"
        className={cN("ml-1")}
      >
        =1
      </Button>
      <MyContext.Provider value={provide}>
        {props.children}
        <Child></Child>
      </MyContext.Provider>
    </Card>
  );
}
