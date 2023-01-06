import React from "react";
/**
 * 类型
 */
export namespace Type {
  export type Event = React.SyntheticEvent;
  export type cb<T> = (event: T) => void;
}
/**
 * 阻止默认行为的柯里化函数
 * @param callback 阻止默认行为后执行
 * @returns 调用了 preventDefault 的 EventHandler
 */
export function preventDefault<T extends Type.Event>(callback?: Type.cb<T>) {
  return (event: T) => {
    event.preventDefault();
    callback?.(event);
  };
}
