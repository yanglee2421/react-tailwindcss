import { useClass } from "@/hook";
import style from "./test.module.scss";
import { Card, Button } from "antd";
import { createContext, useState } from "react";
import Child from "./child";
const cN = useClass(style);
const MyContext = createContext({});
export default () => {
  console.log("父组件生成了虚拟DOM");

  const [count, setCount] = useState(0);
  return (
    <Card
      title={count || "0"}
      className={cN("m-1")}
    >
      <Button
        onClick={(e) => setCount((prev) => prev + 1)}
        type="primary"
      >
        +1
      </Button>
      <Button
        onClick={(e) => setCount((prev) => 1)}
        type="dashed"
        className={cN("ml-1")}
      >
        =1
      </Button>
      <MyContext.Provider value={{ count, setCount }}>
        <Child></Child>
      </MyContext.Provider>
    </Card>
  );
};
