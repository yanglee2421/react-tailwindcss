import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import { store, persistedStore, AppDispatch, RootState } from "./store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

// Slice
export { apiRtkq } from "./api-rtkq";
export { sliceLogin } from "./slice-login";

// Hooks
type UseAppSelector = TypedUseSelectorHook<RootState>;
type UseAppDispatch = () => AppDispatch;
export const useAppSelector: UseAppSelector = useSelector;
export const useAppDispatch: UseAppDispatch = useDispatch;

// Components
export function ReactRedux(props: React.PropsWithChildren) {
  const { children } = props;
  return (
    <Provider store={store}>
      <PersistGate persistor={persistedStore}>{children}</PersistGate>
    </Provider>
  );
}
