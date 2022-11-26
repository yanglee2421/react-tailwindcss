import useClass from "@/hook/useClass";
import style from "./404.module.scss";
import { SwzCard } from "@/component";
const cN = useClass(style);
function Page404() {
  return (
    <div>
      <h1>404，发生了一些问题</h1>
      <SwzCard style={{ width: 500 }}>一些内容</SwzCard>
    </div>
  );
}
export default Page404;
