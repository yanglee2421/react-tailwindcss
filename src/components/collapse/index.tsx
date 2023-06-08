import React from "react";
import style from "./style.module.scss";
import { useStyle } from "@/hooks";

interface CollapseProps extends React.PropsWithChildren {
  open: boolean;
}

export function Collapse(props: CollapseProps) {
  const { open, children } = props;
  const cls = useStyle(style);
  return (
    <div className={cls(["collapse", open ? "collapse--open" : ""])}>
      <div className={cls("collapse__content")}>{children}</div>
    </div>
  );
}
