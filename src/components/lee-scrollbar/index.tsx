// Scrollbar Imports
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";

// React Imports
import React, { useEffect, useRef, useImperativeHandle } from "react";

// MUI Imports
import { styled, Box, BoxProps } from "@mui/material";

const BoxStyled = styled(Box)({
  position: "relative",
});

export const LeeScrollbar = React.forwardRef<HTMLDivElement, LeeScrollbarProps>(
  (props, ref) => {
    // ** Props
    const { children, options, sx, ...restProps } = props;

    // ** Ref
    const outerRef = useRef<HTMLDivElement>(null);
    const innerRef = useRef<HTMLDivElement>(null);
    useImperativeHandle(ref, () => {
      const outerEl = outerRef.current;
      if (!outerEl) throw new Error("Invalid Ref");
      return outerEl;
    });

    // Scrollbar Effect
    useEffect(() => {
      const outerEl = outerRef.current;
      if (!outerEl) throw new Error("Invalid outerer Element");
      const ps = new PerfectScrollbar(outerEl, options);

      const innerEl = innerRef.current;
      if (!innerEl) throw new Error("Invalid Inner Element");
      const observer = new ResizeObserver(ps.update.bind(ps));
      observer.observe(outerEl);
      observer.observe(innerEl);

      return () => {
        observer.disconnect();
      };
    }, [options]);

    // Disabled Border
    const borderValue = "0 !important";
    Reflect.set(Object(sx), "border", borderValue);

    return (
      <BoxStyled ref={outerRef} {...restProps} sx={sx} border={borderValue}>
        <div ref={innerRef}>{children}</div>
      </BoxStyled>
    );
  }
);

export interface LeeScrollbarProps extends BoxProps {
  options?: PerfectScrollbar.Options;
}
