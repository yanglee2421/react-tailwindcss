import React, { useState } from "react";
import { useNavigate, useOutlet } from "react-router-dom";

type submit = React.HtmlHTMLAttributes<HTMLFormElement>["onSubmit"];
/**
 * 浏览器抓取密码如何触发？
 *
 * 表单提交的默认行为
 * 路由发生变化
 * 两个input
 * - 挂载时，text + password
 * - 提交时，text + password
 */
export default function PageSign() {
  const navigate = useNavigate();
  const outlet = useOutlet();

  const [showPwd, setShowPwd] = useState(true);
  return (
    <div>
      {outlet}
      <form>
        <input type="text" />
        <input type={showPwd ? "text" : "password"} />
        <input
          type="checkbox"
          checked={showPwd}
          onChange={(e) => setShowPwd(e.target.checked)}
        />
        <button onClick={() => navigate("/sign/show")}>save</button>
      </form>
    </div>
  );
}
