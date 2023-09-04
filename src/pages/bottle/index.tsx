// Styles Imports
import style from "./style.module.scss";

export function Component() {
  return (
    <div className={style.box}>
      <div className={style.bottle}>
        <div className={style.water}></div>
      </div>
      <div className={style.bottleBottom}></div>
    </div>
  );
}
