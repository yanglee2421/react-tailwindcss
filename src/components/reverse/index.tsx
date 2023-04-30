import React from "react";
import style from "./style.module.scss";
import { useStyle } from "@/hooks";

interface ReverseProps extends React.PropsWithChildren {
  showBack: boolean;
  back: React.ReactNode;
  className?: string;
}

export function Reverse(props: ReverseProps) {
  const { showBack, children, back, className = "" } = props;

  const cx = useStyle(style);
  const transClass = showBack ? "reverse--back" : "";
  const boxClass = "reverse " + transClass;

  return (
    <div className={cx(boxClass) + className}>
      <div className={cx("reverse__front")}>{children}</div>
      <div className={cx("reverse__back")}>{back}</div>
    </div>
  );
}
