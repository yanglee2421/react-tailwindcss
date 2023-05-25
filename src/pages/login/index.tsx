import { login, useAppDispatch } from "@/redux";
import { useQuery } from "@tanstack/react-query";

export function Component() {
  const dispatch = useAppDispatch();
  const handleLogin = () => {
    dispatch(login.actions.actSetState(true));
  };

  useQuery({
    queryKey: ["unique"],
  });

  return (
    <div className="h-100">
      <button onClick={handleLogin}>login</button>
    </div>
  );
}
