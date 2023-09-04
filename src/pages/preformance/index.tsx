// Classes Imports
import style from "./style.module.scss";
import clsx from "clsx";

export function Component() {
  return <div className={clsx(["h-full", style.box])}>performance</div>;
}
