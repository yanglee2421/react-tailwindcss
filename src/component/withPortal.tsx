import React from "react";
import { createPortal } from "react-dom";
export namespace Type {
  export type props = React.PropsWithChildren;
  export type RC = React.ComponentType<any>;
}
/**
 * 类似 vue 中的 teleport 组件
 * @param RC React Component
 * @param to CssSelector
 * @returns createPortal 处理过的 RC
 */
export function withPortal<Ref = any, Props extends Type.props = any>(
  RC: Type.RC,
  to?: string
) {
  return React.forwardRef<Ref, Props>((props, ref) => {
    const { children, ...restProps } = props;
    let target = document.body;
    const dom = document.querySelector(to || "body");
    if (dom instanceof HTMLElement) target = dom;
    return createPortal(
      <RC {...restProps} ref={ref}>
        {children}
      </RC>,
      target
    );
  });
}
