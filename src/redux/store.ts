import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { login } from "./slice-login";
import { rtkq } from "./rtkq";
import { useSelector, useDispatch, TypedUseSelectorHook } from "react-redux";

export const store = configureStore({
  reducer: {
    [rtkq.reducerPath]: rtkq.reducer,
    [login.name]: login.reducer,
  },
  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware().concat(rtkq.middleware);
  },
});

// Enable refetchOnReconnect & refetchOnFocus
setupListeners(store.dispatch);

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch: () => AppDispatch = useDispatch;
export { Provider } from "react-redux";
