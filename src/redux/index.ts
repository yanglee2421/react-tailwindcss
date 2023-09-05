// Redux Imports
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "./redux-store";

// Hooks Exports
type UseAppDispatch = () => AppDispatch;
type UseAppSelector = TypedUseSelectorHook<RootState>;
export const useAppDispatch: UseAppDispatch = useDispatch;
export const useAppSelector: UseAppSelector = useSelector;

// Components Exports
export { ReduxProvider } from "./redux-provider";

// Slice Exports
export { sliceLoginLocal } from "./slice-login-local";
export { sliceLoginSession } from "./slice-login-session";
export { sliceTheme } from "./slice-theme";
export { sliceDemo } from "./slice-demo";
