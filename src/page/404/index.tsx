import useClass from "@/hook/useClass";
import style from "./404.module.scss";
import { SwzCard } from "@/component";
import type { SwzCardType } from "@/component";
import { forwardRef, useEffect, useRef, useState } from "react";
import { Card, Button, Input } from "antd";
import type { InputRef } from "antd";
const cN = useClass(style);
export default forwardRef<HTMLDivElement>((props, ref) => {
  const [count, setCount] = useState(0);
  console.log(count, "组件函数本体");
  useEffect(() => {
    console.log(CardRef.current.name, "effect（仅挂载）");
    // inputRef.current?.focus();
    return () => {
      console.log(CardRef, "return effect（仅挂载）");
    };
  }, []);
  useEffect(() => {
    console.log(count, "effect02");
    inputRef.current?.focus();
    return () => {
      console.log(count, "return effect02");
    };
  }, [count]);
  const CardRef = useRef<SwzCardType.Ref>({ name: "" });
  const inputRef = useRef<InputRef>(null);
  // console.log(SwzCard);

  return (
    <div ref={ref}>
      <h1>404，</h1>
      <p>很遗憾，这里什么也没有</p>
      <SwzCard
        ref={CardRef}
        className="swz-card-01"
        style={{ width: 500 }}
      >
        一些内容
      </SwzCard>
      <Card
        title="计数器"
        className={cN("swz-card m-1")}
      >
        <div>计数：{count}</div>
        {count % 2 === 1 && <Input ref={inputRef}></Input>}
        <Button
          onClick={(e) => setCount(() => count + 1)}
          danger
        >
          +1
        </Button>
      </Card>
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
