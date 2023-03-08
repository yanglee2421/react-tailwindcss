import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { globalMod } from "@/util";
import style from "./style.module.scss";
import { useClass } from "@/hook";

export default function Page() {
  const [count, setCount] = useState(0);

  const [state, setState] = useState({});
  const ref = useRef({});
  const mem = useMemo(() => ({}), []);
  const cfx = useCallback(() => {}, [count]);
  globalMod.target ??= setState;
  console.log(globalMod.target === setState);

  /*   useEffect(() => {
    if (globalMod.target === null) {
      globalMod.target = ref;
    }
    console.log(globalMod.target === ref);
  }, [count]); */

  const child = useMemo(() => {
    return <Component />;
  }, [cfx]);

  return (
    <>
      <h1>{count}</h1>
      <Title />
      <button onClick={(e) => setCount((prev) => prev + 1)}>+1</button>
      {globalMod.target === ref && <p>123456</p>}
      {/* <Component /> */}
      {child}
    </>
  );
}

function Component() {
  const cx = useClass(style);
  console.log("render");

  return (
    <div className={cx("outer")}>
      <div className={cx("inner")}></div>
    </div>
  );
}

function Title() {
  const cx = useClass(style);

  return (
    <div>
      <span className={cx("title-h1")}>Hello world</span>
    </div>
  );
}
