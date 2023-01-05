import { Switch, SwitchProps } from "antd";
import { useCallback } from "react";
import { useAppDispatch, useAppSelector, actIsDark } from "@/redux";

export function DarkSwitch(props: SwitchProps) {
  const dispatch = useAppDispatch();
  const isDark = useAppSelector((state) => state.theme.isDark);
  const swhChg = useCallback(
    (params: boolean) => dispatch(actIsDark(params)),
    []
  );
  return (
    <Switch
      {...props}
      defaultChecked={isDark}
      onChange={swhChg}
    />
  );
}
