import { Switch, SwitchProps } from "antd";
import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "@/redux";
import { isDarkAct } from "@/redux/slice-theme";

export default DarkSwitch;

function DarkSwitch(props: SwitchProps) {
  const dispatch = useAppDispatch();
  const isDark = useAppSelector((state) => state.theme.isDark);
  const swhChg = useCallback(
    (params: boolean) => dispatch(isDarkAct(params)),
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
