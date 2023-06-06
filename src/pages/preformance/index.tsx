import style from "./style.module.scss";
import { useStyle } from "@/hooks";
import React, { useState } from "react";
import { Ctx } from "./utils";
import { Counter } from "@/components";

const Child2 = React.memo(Chid);

export function Component() {
  const cx = useStyle(style);

  const [ctxValue, setCtxValue] = useState({});

  return (
    <div className={cx("h-100 box")}>
      <button onClick={() => setCtxValue({})}>change</button>
      <Ctx.Provider value={ctxValue}>
        <Child2></Child2>
      </Ctx.Provider>
    </div>
  );
}

function Chid() {
  // const ctxValue = useContext(Ctx);
  // console.log("ctxValue", ctxValue);

  return <Counter></Counter>;
}
