// Antd Imports
import { Switch, SwitchProps } from "antd";

// Redux Imports
import { useAppDispatch, useAppSelector, sliceTheme } from "@/redux";

export function ThemeToggle() {
  const dispatch = useAppDispatch();
  const isDark = useAppSelector((s) => s.theme.isDark);
  const handleToggle: HandleToggle = (checked) => {
    const action = sliceTheme.actions.isDark(checked);
    dispatch(action);
  };

  return <Switch checked={isDark} onChange={handleToggle} />;
}
type HandleToggle = SwitchProps["onChange"];
