import { useAppDispatch, login } from "@/redux";
import style from "./home.module.scss";
import { useStyle } from "@/hooks";

export function Component() {
  const cx = useStyle(style);

  const disPatch = useAppDispatch();
  const handleLogout = () => {
    disPatch(login.actions.actSetState(false));
  };

  return (
    <div className={cx("home b h-100")}>
      <div></div>
      <button onClick={handleLogout}>log out</button>
    </div>
  );
}
