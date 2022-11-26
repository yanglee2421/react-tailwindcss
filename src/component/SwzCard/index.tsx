import useClass from "@/hook/useClass";
import { ReactNode } from "react";
interface _props {
  children?: ReactNode | ReactNode[];
  style?: Record<string, unknown>;
}
import style from "./index.module.scss";
const cN = useClass(style);
function SwzCard(props: _props) {
  const { children = null, style } = props;
  return (
    <div
      className={cN("root")}
      style={style}
    >
      {children}
    </div>
  );
}
export default SwzCard;
