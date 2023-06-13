import { useStyle } from "@/hooks";
import React from "react";
import style from "./style.module.scss";
import img from "@/assets/image/avatar/fh.jpg";
import { message } from "antd";

export function Component() {
  const cx = useStyle(style);

  return (
    <div className={cx("box")}>
      <h2>Form & Input</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          message.success("提交成功");
          const data = new FormData(e.currentTarget);
          const obj = Object.fromEntries(data.entries());
          console.log(obj);
        }}
      >
        <Label>
          <input type="text" name="text" required />
          <input type="number" name="number" max={99} min={1} />
          <input type="url" name="url" />
          <input type="search" name="search" maxLength={9} minLength={2} />
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
          <input type="radio" name="radio" defaultChecked />
          {/* 其它输入 */}
          <input type="color" name="color" defaultValue="#ffffff" />
          <input type="file" name="file" />
          <input type="range" name="range" />
          <input type="hidden" name="hidden" />
          {/* 表单操作 */}
          <input type="button" value="inputBtn" />
          <input type="image" src={img} />
          <input type="submit" value="submitBtn" />
          <input type="reset" value="resetBtn" />
        </Label>
        <ol className={cx("ol")}>
          <li>
            <label>
              radio2：
              <input type="radio" name="radio" value={2} />
            </label>
          </li>
          <li>
            <label>select：</label>
            <select name="select">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>
          </li>
          <li>
            <label>textarea：</label>
            <textarea
              name="textarea"
              maxLength={20}
              minLength={2}
              cols={30}
              rows={5}
            ></textarea>
          </li>
        </ol>
      </form>
    </div>
  );
}

interface LabelProps {
  label?: string;
  children: any[];
}

function Label(props: LabelProps) {
  const { children } = props;
  const cx = useStyle(style);
  const arr = React.Children.map(children, (e, index) => {
    if (!e) return;
    return (
      <li key={index}>
        <label>
          {e.props?.type + "：" || ""}
          {e}
        </label>
      </li>
    );
  });
  return <ol className={cx("form-ul")}>{arr}</ol>;
}
