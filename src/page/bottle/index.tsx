import style from "./style.module.scss";
import { useClass } from "@/hook";
import React from "react";

/**
 * Demo 页面
 * @returns JSX
 */
export function PageBottle() {
  const cx = useClass(style);

  return (
    <div className={cx("box")}>
      <div className={cx("bottle")}>
        <div className={cx("water")}></div>
      </div>
      <div className={cx("bottle-bottom")}></div>
    </div>
  );
}

export default React.memo(PageBottle);
