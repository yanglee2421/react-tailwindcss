import { login, useAppDispatch } from "@/redux";

export default function PageLogin() {
  const dispatch = useAppDispatch();
  const handleLogin = () => {
    dispatch(login.actions.actSetState(true));
  };
  const handleLogout = () => {
    dispatch(login.actions.actSetState(false));
  };
  return (
    <div className="h-100">
      <button onClick={handleLogin}>login</button>
      <button onClick={handleLogout}>log out</button>
    </div>
  );
}
