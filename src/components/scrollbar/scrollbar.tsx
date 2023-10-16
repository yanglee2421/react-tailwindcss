// Perfect Scrollbar Imports
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";

// Hooks Imports
import { useObserverResize } from "@/hooks";

// React Imports
import React from "react";

export const Scrollbar = React.forwardRef<HTMLDivElement, ScrollbarProps>(
  (props, ref) => {
    // ** Props
    const { options, style, children, ...restProps } = props;

    const containerRef = React.useRef<HTMLDivElement>(null);
    const contentRef = React.useRef<HTMLDivElement>(null);
    const psRef = React.useRef<PerfectScrollbar>(null);
    const containerEntry = useObserverResize(containerRef);
    const contentEntry = useObserverResize(contentRef);

    React.useImperativeHandle(
      ref,
      () => {
        const el = containerRef.current;
        if (!el) throw new Error("Excepted a HTMLDivElement, got a falsy!");

        return el;
      },
      [containerRef]
    );

    React.useEffect(() => {
      const el = containerRef.current;
      if (!el) return;

      psRef.current = new PerfectScrollbar(el, options);

      return () => {
        psRef.current?.destroy();
        psRef.current = null;
      };
    }, [containerRef, options, psRef]);

    React.useEffect(() => {
      void containerEntry;
      void contentEntry;
      psRef.current?.update();
    }, [containerEntry, contentEntry, psRef]);

    return (
      <div
        ref={containerRef}
        style={{ position: "relative", height: "100%", ...style }}
        {...restProps}
      >
        <div ref={contentRef}>{children}</div>
      </div>
    );
  }
);

export interface ScrollbarProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  options?: PerfectScrollbar.Options;
}
