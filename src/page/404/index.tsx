import useClass from "@/hook/useClass";
import style from "./404.module.scss";
import { forwardRef, useEffect, useRef, useState } from "react";
import { Card, Button, Input, Divider, Empty } from "antd";
import type { InputRef } from "antd";
const cN = useClass(style);
export default forwardRef<HTMLDivElement>((props, ref) => {
  const [count, setCount] = useState(0);
  console.log(count, "组件函数本体");
  useEffect(() => {
    console.log(count, "effect02");
    inputRef.current?.focus();
    return () => {
      console.log(count, "return effect02");
    };
  }, [count]);
  const inputRef = useRef<InputRef>(null);

  return (
    <div
      ref={ref}
      className={cN("p-1")}
    >
      <h1 className={cN("text-danger")}>404</h1>
      <p className={cN("text-info")}>很遗憾，这里什么也没有...</p>
      <Divider>华丽的分隔线</Divider>
      <div className={cN("flex center-center")}>
        <Card
          title="计数器"
          className={cN("swz-card m-1 w-50")}
        >
          <div>计数：{count}</div>
          {count % 2 === 1 && (
            <Input
              ref={inputRef}
              className={cN("mt-1")}
            ></Input>
          )}
          <Button
            onClick={(e) => setCount(() => count + 1)}
            danger
            className={cN("mt-1")}
          >
            +1
          </Button>
        </Card>
      </div>
      <Divider>华丽的分隔线</Divider>
      <Empty></Empty>
    </div>
  );
});
/**
 * - 挂载流程（effect未指定依赖时）
 * 1.组件函数
 * 2.effect
 * 3.return effect（卸载时才执行）
 *
 *
 *
 * - 更新流程
 * 1.组件函数
 * 2.return effect（处理上一个effect返回的return）
 * 3.effect
 */
