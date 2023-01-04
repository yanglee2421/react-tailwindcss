import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { authApi, bingApi } from "@/api/rtkq";
import auth, { loginoutAct } from "./slice-auth";
import gallery from "./slice-gallery";
import theme from "./slice-theme";

const store = configureStore({
  reducer: {
    [auth.name]: auth.reducer,
    [gallery.name]: gallery.reducer,
    [theme.name]: theme.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [bingApi.reducerPath]: bingApi.reducer,
  },
  middleware: (getMiddleWare) =>
    getMiddleWare().concat(authApi.middleware, bingApi.middleware),
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// 设置以后支持refetchOnReconnect、refetchOnFocus
setupListeners(store.dispatch);

/**
 * 自动注销登登录
 */
let timer: NodeJS.Timeout | undefined;
store.subscribe(() => {
  const {
    auth: { isLogined, invalidTime },
  } = store.getState();
  const validTime = invalidTime - Date.now() - 1000 * 60;
  if (isLogined && validTime > 0) {
    timer ||= setTimeout(() => {
      store.dispatch(loginoutAct());
    }, validTime);
    return;
  }
  if (timer) {
    clearTimeout(timer);
    timer &&= undefined;
    return;
  }
});
