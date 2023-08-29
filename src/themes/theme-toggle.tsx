// Antd Imports
import { Switch } from "antd";

// Redux Imports
import { useAppDispatch, useAppSelector, sliceTheme } from "@/redux";

export function ThemeToggle() {
  const dispatch = useAppDispatch();
  const isDark = useAppSelector((s) => s.theme.isDark);
  const handleToggle = () => {
    const action = sliceTheme.actions.isDarkToggle();
    dispatch(action);
  };

  return <Switch checked={isDark} onChange={handleToggle} />;
}
