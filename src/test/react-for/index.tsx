import style from "./index.module.scss";
import useClass from "@/hook/useClass";
import { useState } from "react";
import { Button } from "antd";
const cl = useClass(style);
function ReactFor() {
  const [arr, setArr] = useState([
    { name: "张三", age: 18 },
    { name: "李四", age: 19 },
  ]);
  return (
    <>
      <ul className={cl("")}>
        {arr.map((item, index) => (
          <li key={index}>
            {item.name}-{item.age}
          </li>
        ))}
      </ul>
      <Button
        onClick={(e) =>
          setArr(() => [
            { name: "张三", age: 88 },
            { name: "李四", age: 99 },
          ])
        }
        danger
      >
        更改
      </Button>
    </>
  );
}
export default ReactFor;
