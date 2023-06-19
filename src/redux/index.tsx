import {
  Provider,
  TypedUseSelectorHook,
  useDispatch,
  useSelector,
} from "react-redux";

// Persist Imports
import { PersistGate } from "redux-persist/integration/react";

// Store Imports
import { store, persistor, AppDispatch, RootState } from "./root-store";

// React Imports
import React from "react";

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
export function ReactRedux(props: React.PropsWithChildren) {
  const { children } = props;
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>{children}</PersistGate>
    </Provider>
  );
}
