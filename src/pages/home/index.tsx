import React, { useEffect, useRef } from "react";
import style from "./home.module.scss";
import { useStyle } from "@/hooks";

/**
 * 首页
 * @returns JSX
 */
export default function PageHome() {
  const cx = useStyle(style);

  const divRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const div = divRef.current;
    if (!div) return;
    const observer = new ResizeObserver((entries) => {
      console.log(entries);
    });
    observer.observe(div);
    return () => {
      observer.disconnect();
    };
  }, []);

  return <div ref={divRef} className={cx("home b h-100")}></div>;
}
