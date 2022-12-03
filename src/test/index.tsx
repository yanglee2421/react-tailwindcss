import { useClass } from "@/hook";
import style from "./test.module.scss";
import { Card, Button } from "antd";
import { useState } from "react";
import Child from "./child";
const cN = useClass(style);
export default () => {
  console.log("父组件生成了虚拟DOM");

  const [count, setCount] = useState(0);
  return (
    <div>
      <Card title={count}>
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
        <Child></Child>
      </Card>
    </div>
  );
};
