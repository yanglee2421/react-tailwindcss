import { Switch, SwitchProps } from "antd";
import { useCallback } from "react";
import { useAppDispatch, useAppSelector, actIsDark } from "@/redux";
/**
 * 手动切换网页黑暗模式的开关
 * @param props 同 SwitchProps
 * @returns JSX
 */
export function DarkSwitch(props: SwitchProps) {
  const dispatch = useAppDispatch();
  const isDark = useAppSelector((state) => state.theme.isDark);
  const swhChg = useCallback(
    (params: boolean) => dispatch(actIsDark(params)),
    []
  );
  return <Switch {...props} onChange={swhChg} checked={isDark} />;
}
