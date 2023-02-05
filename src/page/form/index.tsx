import { useClass } from "@/hook";
import React from "react";
import style from "./style.module.scss";
import img from "@/assets/image/avatar/fh.jpg";

export function PageForm() {
  const cx = useClass(style);

  return (
    <div className={cx("box")}>
      <h2>Form & Input</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const data = new FormData(e.currentTarget);
          console.log([...data.entries()]);
        }}
      >
        <Label>
          <input type="text" name="text" />
          <input type="number" name="number" />
          <input type="url" name="url" />
          <input type="search" name="search" />
          <input type="password" name="password" />
          <input type="email" name="email" />
          <input type="tel" name="tel" />
          {/* 日期时间 */}
          <input type="datetime-local" name="datetime-local" />
          <input type="month" name="month" />
          <input type="date" name="date" />
          <input type="week" name="week" />
          <input type="time" name="time" />
          {/* 单选复选 */}
          <input type="checkbox" name="checkbox" />
          <input type="radio" name="radio" />
          {/* 其它输入 */}
          <input type="color" name="color" />
          <input type="file" name="file" />
          <input type="range" name="range" />
          <input type="hidden" name="hidden" />
          {/* 表单操作 */}
          <input type="button" value="inputBtn" />
          <input type="image" src={img} />
          <input type="submit" value="submitBtn" />
          <input type="reset" value="resetBtn" />
        </Label>
        <select name="select">
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>
        <textarea name="textarea" cols={30} rows={5}></textarea>
      </form>
    </div>
  );
}

export default React.memo(PageForm);

namespace t {
  export interface props extends React.PropsWithChildren {
    label?: string;
  }
}
function Label(props: t.props) {
  const cx = useClass(style);
  const arr = React.Children.map(props.children, (e, index) => {
    if (!e) return;
    return (
      <li key={index}>
        <label>
          {/* @ts-ignore */}
          {e.props?.type + "：" || ""}
          {e}
        </label>
      </li>
    );
  });
  return <ol className={cx("form-ul")}>{arr}</ol>;
}
