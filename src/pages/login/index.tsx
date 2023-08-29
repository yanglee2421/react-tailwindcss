// Redux Imports
import { useAppDispatch, sliceLogin } from "@/redux";
import { Button } from "antd";

export function Component() {
  const dispatch = useAppDispatch();
  const handleSignIn = (role: "admin" | "client") => {
    const action = sliceLogin.actions.islogged(true);
    const roleAction = sliceLogin.actions.role(role);
    dispatch(action);
    dispatch(roleAction);
  };

  return (
    <>
      <Button onClick={() => handleSignIn("admin")}>Sign In As Admin</Button>
      <Button onClick={() => handleSignIn("client")}>Sign In As Client</Button>
    </>
  );
}
