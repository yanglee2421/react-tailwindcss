import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { authApi } from "@/api/api-rtkq";
import auth, { actSignOut } from "./slice-auth";
import gallery from "./slice-gallery";
import theme from "./slice-theme";
/**
 * 全局store
 */
export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [auth.name]: auth.reducer,
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
/**
 * 自动注销登录
 */
let timer: NodeJS.Timeout | undefined;
store.subscribe(() => {
  const {
    auth: { isLogined, invalidTime },
  } = store.getState();
  const validTime = invalidTime - Date.now() - 1000 * 60;
  if (isLogined && validTime > 0) {
    timer ||= setTimeout(() => store.dispatch(actSignOut()), validTime);
    return;
  }
  if (timer) {
    clearTimeout(timer);
    timer &&= undefined;
    return;
  }
});
