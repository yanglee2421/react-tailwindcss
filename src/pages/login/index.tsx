import { login, useAppDispatch } from "@/redux";

export default function PageLogin() {
  const dispatch = useAppDispatch();
  const handleLogin = () => {
    dispatch(login.actions.actSetState(true));
  };

  return (
    <div className="h-100">
      <button onClick={handleLogin}>login</button>
    </div>
  );
}
