import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { globalMod } from "@/util";

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
      <button onClick={(e) => setCount((prev) => prev + 1)}>+1</button>
      {globalMod.target === ref && <p>123456</p>}
      {/* <Component /> */}
      {child}
    </>
  );
}

function Component() {
  console.log("render");

  return <></>;
}
