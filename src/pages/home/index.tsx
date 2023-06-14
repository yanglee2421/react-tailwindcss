import { useAppDispatch, sliceLogin } from "@/redux";

// Style Imports
import style from "./home.module.scss";

// Hooks Imports
import { useStyle } from "@/hooks";
import { useLoginQuery } from "./hooks";
import { useEffect } from "react";

export function Component() {
  const cx = useStyle(style);

  const disPatch = useAppDispatch();
  const handleLogout = () => {
    disPatch(sliceLogin.actions.actSetState(false));
  };

  const { data } = useLoginQuery();

  console.log(data);
  useEffect(() => {
    if (!data) return;
    localStorage.setItem("token", data.token);
  }, [data]);

  return (
    <div className={cx("home b h-100")}>
      <div></div>
      <button onClick={handleLogout}>log out</button>
    </div>
  );
}
