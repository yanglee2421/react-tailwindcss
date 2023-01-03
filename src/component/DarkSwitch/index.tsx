import { Switch, SwitchProps } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useCallback } from "react";
import { setIsDarkAct } from "@/redux/slice-theme";
export default (props: SwitchProps) => {
  const dispatch = useDispatch();
  const isDark = useSelector<any, boolean>((state) => state.theme.isDark);
  const swhChg = useCallback(
    (params: boolean) => dispatch(setIsDarkAct(params)),
    []
  );
  return (
    <Switch
      {...props}
      defaultChecked={isDark}
      onChange={swhChg}
    />
  );
};
