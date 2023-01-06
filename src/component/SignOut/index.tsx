import { Button, ButtonProps } from "antd";
import { useAppDispatch, actSignOut } from "@/redux";
import { useCallback } from "react";
/**
 * SignOut 组件，点击时登出
 * @returns JSX
 */
export function SignOut(props: ButtonProps) {
  const { children, ...restProps } = props;
  const dispatch = useAppDispatch();
  const signOut = useCallback(() => dispatch(actSignOut()), []);
  return (
    <Button {...restProps} onClick={signOut}>
      {children || "Sign Out"}
    </Button>
  );
}
