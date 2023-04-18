import style from "./style.module.scss";
import { useStyle } from "@/hooks";

/**
 * Demo 页面
 * @returns JSX
 */
export default function PageBottle() {
  const cx = useStyle(style);

  return (
    <div className={cx("box")}>
      <div className={cx("bottle")}>
        <div className={cx("water")}></div>
      </div>
      <div className={cx("bottle-bottom")}></div>
    </div>
  );
}
