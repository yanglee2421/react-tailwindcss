// Redux Imports
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

// Store Imports
import { AppDispatch, RootState } from "./root-store";

// Slice Exports
export { sliceLogin } from "./slice-login";
export { sliceTheme } from "./slice-theme";
export { sliceDemo } from "./slice-demo";

// Hooks Exports
type UseAppDispatch = () => AppDispatch;
type UseAppSelector = TypedUseSelectorHook<RootState>;
export const useAppDispatch: UseAppDispatch = useDispatch;
export const useAppSelector: UseAppSelector = useSelector;

// Components Exports
export { ReduxProvider } from "./redux-provider";
