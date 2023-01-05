import { useAppDispatch, actSignOut } from "@/redux";
import { Button } from "antd";
import { useCallback } from "react";
export function SignOut() {
  const dispatch = useAppDispatch();
  const signOut = useCallback(() => dispatch(actSignOut()), []);
  return (
    <Button
      onClick={signOut}
      danger
    >
      Sign Out
    </Button>
  );
}
