import React from "react";
import { createPortal } from "react-dom";

export function withPortal<
  Ref = any,
  Props extends React.PropsWithChildren = any
>(RC: React.ComponentType<any>, to?: string) {
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
