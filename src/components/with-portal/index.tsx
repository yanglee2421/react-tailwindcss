// React Imports
import React from "react";
import { createPortal } from "react-dom";

export function withPortal<TRef, TProps extends React.PropsWithChildren>(
  RC: React.ComponentType<Omit<TProps, "children">>,
  to = "body"
) {
  return React.forwardRef<TRef, TProps>((props, ref) => {
    const { children, ...restProps } = props;

    const dom = document.querySelector(to);
    const isHtmlEl = dom instanceof HTMLElement;
    const target = isHtmlEl ? dom : document.body;

    const reactEl = (
      <RC {...restProps} ref={ref}>
        {children}
      </RC>
    );

    return createPortal(reactEl, target);
  });
}
