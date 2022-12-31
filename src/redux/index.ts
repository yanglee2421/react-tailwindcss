import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { authApi, bingApi } from "@/api/rtkq";
import * as reducer from "./slice";
import { loginoutAct } from "./slice/slice-auth";
const store = configureStore({
  reducer: {
    ...reducer,
    [authApi.reducerPath]: authApi.reducer,
    [bingApi.reducerPath]: bingApi.reducer,
  },
  middleware: (getMiddleWare) =>
    getMiddleWare().concat(authApi.middleware, bingApi.middleware),
});
export default store;
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
