import { login, useAppDispatch } from "@/redux";

export function Component() {
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
