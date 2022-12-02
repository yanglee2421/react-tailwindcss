import style from "./index.module.scss";
import useClass from "@/hook/useClass";
import React, { forwardRef, useState } from "react";
import type { HTMLAttributes } from "react";
import { Button } from "antd";
const cN = useClass(style);
export namespace ReactForType {
  export interface Props extends HTMLAttributes<HTMLUListElement> {}
  export interface Ref extends HTMLUListElement {}
}
export default forwardRef<ReactForType.Ref, ReactForType.Props>(
  (props, ref) => {
    const [arr, setArr] = useState([
      { name: "张三", age: 18 },
      { name: "李四", age: 19 },
    ]);
    return (
      <>
        <ul
          {...props}
          ref={ref}
        >
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
);
