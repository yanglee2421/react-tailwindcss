import { useClass } from "@/hook";
import { Layout } from "antd";
import style from "./demo.module.scss";
const cn = useClass(style);
function Demo() {
  return <Layout></Layout>;
}
export default Demo;
