import React from "react";
import { createPortal } from "react-dom";

export function withPortal<Ref, Props extends React.PropsWithChildren>(
  RC: React.ComponentType<any>,
  to: string = "body"
) {
  return React.forwardRef<Ref, Props>((props, ref) => {
    const { children, ...restProps } = props;
    let target = document.body;
    const dom = document.querySelector(to);
    if (dom instanceof HTMLElement) target = dom;
    return createPortal(
      <RC {...restProps} ref={ref}>
        {children}
      </RC>,
      target
    );
  });
}
