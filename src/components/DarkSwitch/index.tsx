// Antd Imports
import { Switch, SwitchProps } from "antd";

// Redux Imports
import { useAppDispatch, useAppSelector, sliceTheme } from "@/redux";

export function DarkSwitch(props: SwitchProps) {
  const dispatch = useAppDispatch();
  const isDark = useAppSelector((state) => state.theme.isDark);
  const swhChg = (params: boolean) => {
    const action = sliceTheme.actions.isDark(params);
    return dispatch(action);
  };
  return <Switch {...props} onChange={swhChg} checked={isDark} />;
}
