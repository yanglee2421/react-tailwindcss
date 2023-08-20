// Styles Imports
import styles from "./home.module.scss";
import clsx from "clsx";

// Utils Imports
import { toStyles } from "@/utils";

const s = toStyles(styles);

export const Home = () => {
  return <div className={clsx(s("home"))}>home</div>;
};
