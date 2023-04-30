import React from "react";
import style from "./style.module.scss";
import { useStyle } from "@/hooks";

interface ReverseProps extends React.PropsWithChildren {
  value: boolean;
  onChange(params: boolean): void;
  back: React.ReactNode;
  className?: string;
}

export function Reverse(props: ReverseProps) {
  const { value, onChange, children, back, className = "" } = props;

  const cx = useStyle(style);

  return (
    <div className={cx("reverse") + className}>
      <input
        type="checkbox"
        checked={value}
        onChange={(e) => onChange(e.target.checked)}
        className={cx("reverse__chk")}
      />
      <div className={cx("reverse__front")}>{children}</div>
      <div className={cx("reverse__back")}>{back}</div>
    </div>
  );
}
