import {
  Provider,
  TypedUseSelectorHook,
  useDispatch,
  useSelector,
} from "react-redux";
import { store, persistor, AppDispatch, RootState } from "./root-store";
import { PersistGate } from "redux-persist/integration/react";
import React from "react";

// Slice
export { login } from "./slice-login";

// Hooks
type UseAppDispatch = () => AppDispatch;
type UseAppSelector = TypedUseSelectorHook<RootState>;
export const useAppDispatch: UseAppDispatch = useDispatch;
export const useAppSelector: UseAppSelector = useSelector;

// Components
export function ReactRedux(props: React.PropsWithChildren) {
  const { children } = props;
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>{children}</PersistGate>
    </Provider>
  );
}
