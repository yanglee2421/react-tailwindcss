// Perfect Scrollbar Imports
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";

// Hooks Imports
import { useObserverResize } from "@/hooks/dom";

// React Imports
import React from "react";

export const Scrollbar = React.forwardRef<HTMLDivElement, ScrollbarProps>(
  (props, ref) => {
    // ** Props
    const { options, style, children, ...restProps } = props;

    const containerRef = React.useRef<HTMLDivElement>(null);
    const contentRef = React.useRef<HTMLDivElement>(null);
    const psRef = React.useRef<PerfectScrollbar | null>(null);
    const containerEntry = useObserverResize(containerRef);
    const contentEntry = useObserverResize(contentRef);

    // Forward ref to outer
    React.useImperativeHandle(
      ref,
      () => {
        const el = containerRef.current;
        if (!el) {
          throw new Error("Excepted a HTMLDivElement, got a falsy!");
        }

        return el;
      },
      [containerRef]
    );

    // Initilized perfect scrollbar instance
    React.useEffect(() => {
      const el = containerRef.current;
      if (!el) return;

      psRef.current = new PerfectScrollbar(el, options);

      return () => {
        psRef.current?.destroy();
        psRef.current = null;
      };
    }, [containerRef, options, psRef]);

    // Update perfect scrollbar instance after container or content resize
    React.useEffect(() => {
      void { containerEntry, contentEntry };

      psRef.current?.update();
    }, [containerEntry, contentEntry, psRef]);

    // Bind scrollbar event handler
    React.useEffect(() => {
      const el = containerRef.current;
      if (!el) return;

      const controller = new AbortController();
      const { signal } = controller;

      if (props.onPsScrollY) {
        el.addEventListener("ps-scroll-y", props.onPsScrollY, { signal });
      }
      if (props.onPsScrollX) {
        el.addEventListener("ps-scroll-x", props.onPsScrollX, { signal });
      }
      if (props.onPsScrollUp) {
        el.addEventListener("ps-scroll-up", props.onPsScrollUp, { signal });
      }
      if (props.onPsScrollDown) {
        el.addEventListener("ps-scroll-down", props.onPsScrollDown, { signal });
      }
      if (props.onPsScrollLeft) {
        el.addEventListener("ps-scroll-left", props.onPsScrollLeft, { signal });
      }
      if (props.onPsScrollRight) {
        el.addEventListener("ps-scroll-right", props.onPsScrollRight, {
          signal,
        });
      }
      if (props.onPsYReachStart) {
        el.addEventListener("ps-y-reach-start", props.onPsYReachStart, {
          signal,
        });
      }
      if (props.onPsYReachEnd) {
        el.addEventListener("ps-y-reach-end", props.onPsYReachEnd, { signal });
      }
      if (props.onPsXReachStart) {
        el.addEventListener("ps-x-reach-start", props.onPsXReachStart, {
          signal,
        });
      }
      if (props.onPsXReachEnd) {
        el.addEventListener("ps-x-reach-end", props.onPsXReachEnd, { signal });
      }

      return () => {
        controller.abort();
      };
    }, [
      containerRef,
      props.onPsScrollY,
      props.onPsScrollX,
      props.onPsScrollUp,
      props.onPsScrollDown,
      props.onPsScrollLeft,
      props.onPsScrollRight,
      props.onPsYReachStart,
      props.onPsYReachEnd,
      props.onPsXReachStart,
      props.onPsXReachEnd,
    ]);

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
  onPsScrollY?(evt: Event): void;
  onPsScrollX?(evt: Event): void;
  onPsScrollUp?(evt: Event): void;
  onPsScrollDown?(evt: Event): void;
  onPsScrollLeft?(evt: Event): void;
  onPsScrollRight?(evt: Event): void;
  onPsYReachStart?(evt: Event): void;
  onPsYReachEnd?(evt: Event): void;
  onPsXReachStart?(evt: Event): void;
  onPsXReachEnd?(evt: Event): void;
}
