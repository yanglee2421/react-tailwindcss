import style from "./style.module.scss";
import { Reverse } from "@/components";
import { useStyle } from "@/hooks";
import React, { useState } from "react";

export default function PagePre() {
  const cx = useStyle(style);

  const [showBack, setShowBack] = useState(false);

  return (
    <div
      onClick={(e) => setShowBack((prev) => !prev)}
      className={cx("h-100 box")}
    >
      <div className="b">
        <Reverse showBack={showBack} back={"back"} className="h-100">
          <div className="b h-100">fron</div>
        </Reverse>
      </div>
    </div>
  );
}
