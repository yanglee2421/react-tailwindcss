import { useClass } from "@/hook";
import style from "./child.module.scss";
import WebWorker from "../webWorker";
const cn = useClass(style);
export default () => {
  return (
    <div className={cn("mt-1")}>
      <p>这是子组件</p>
      <WebWorker></WebWorker>
    </div>
  );
};
