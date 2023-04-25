import style from "./style.module.scss";
import { useStructure, useStyle } from "@/hooks";

export default function MyEdit() {
  const cx = useStyle(style);
  // 用法
  const [obj, setObj] = useStructure({
    name: "孙悟空",
  });
  setObj((prev) => {
    prev.name = "猪八戒";
  });
  return <></>;
}
