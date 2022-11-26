import style from "./index.module.scss";
import useClass from "@/hook/useClass";
import { useEffect, useState } from "react";
import { Button, Card } from "antd";

const cN = useClass(style);
function ReactIf({ age = "18" }: { age?: string }) {
  const [count, setCount] = useState(0);
  console.log(age);

  useEffect(() => {
    console.log("useEffect，我来了");
    return () => {
      console.log("useEffect，我走了");
    };
  }, []);

  useEffect(() => {
    console.log("count更新了", count);
  }, [count]);
  return (
    <Card
      title="计数器"
      className={cN("m-2")}
      style={{ width: 300 }}
    >
      <h3>couter：{count}</h3>
      <Button
        onClick={(e) => setCount(() => count + 1)}
        type="primary"
      >
        +1
      </Button>
    </Card>
  );
}
export default ReactIf;
