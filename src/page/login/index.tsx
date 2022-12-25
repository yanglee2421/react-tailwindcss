import style from "./login.module.scss";
import type { PropsWithChildren } from "react";
export namespace Type {
  export interface Props extends PropsWithChildren {}
}
export default (props: Type.Props) => {
  return <div>{props.children}</div>;
};
