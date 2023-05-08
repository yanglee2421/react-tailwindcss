import style from "./home.module.scss";
import { Card } from "antd";
import { useStyle } from "@/hooks";
import { useAppSelector } from "@/redux";

/**
 * 首页
 * @returns JSX
 */
export default function PageHome() {
  const cx = useStyle(style);

  const state = useAppSelector((state) => state);
  console.log(state);

  return (
    <div className={cx("home")}>
      <Card></Card>
    </div>
  );
}
