import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { authApi } from "@/api/api-rtkq";
import { gallery } from "./slice-gallery";
import { theme } from "./slice-theme";
import { sliceAuth } from "./slice-auth";

/**
 * 全局store
 */
export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [sliceAuth.name]: sliceAuth.reducer,
    [gallery.name]: gallery.reducer,
    [theme.name]: theme.reducer,
  },
  middleware(getMiddleWare) {
    return getMiddleWare().concat(authApi.middleware);
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
/**
 * 设置 setupListeners 以支持以下属性
 * 1. refetchOnReconnect
 * 2. refetchOnFocus
 */
setupListeners(store.dispatch);
