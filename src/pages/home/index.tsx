import { useAppDispatch, login } from "@/redux";
import style from "./home.module.scss";
import { useStyle } from "@/hooks";

/**
 * 首页
 * @returns JSX
 */
export default function PageHome() {
  const cx = useStyle(style);

  const disPatch = useAppDispatch();
  const handleLogout = () => {
    disPatch(login.actions.actSetState(false));
  };

  return (
    <div className={cx("home b h-100")}>
      <button onClick={handleLogout}>log out</button>
    </div>
  );
}
