import { useQuery } from "@tanstack/react-query";
import style from "./style.module.scss";
import { useStyle } from "@/hooks";

interface Data {
  msg: string;
}

export default function MyEdit() {
  const cx = useStyle(style);
  const { data } = useQuery<Data>(["unique"]);
  return <>{data?.msg}</>;
}
