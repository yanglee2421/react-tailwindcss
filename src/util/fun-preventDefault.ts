import React from "react";
/**
 * 类型
 */
export namespace Type {
  export type Event = React.SyntheticEvent;
  export type cb<T> = (event: T) => void;
}
/**
 * 返回一个函数
 * 该函数会阻止事件的默认行为
 * 并执行 callback
 */
export function preventDefault<T extends Type.Event>(callback?: Type.cb<T>) {
  return (event: T) => {
    event.preventDefault();
    callback?.(event);
  };
}
