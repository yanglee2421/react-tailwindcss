import { configureStore, Reducer } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { authApi, bingApi } from "@/api/rtkq";
import { loginoutAct } from "./slice-auth";
const slice = import.meta.glob<true, string, Reducer>("./slice-*.ts", {
  eager: true,
  import: "default",
});
const sliceReducer: Record<string, Reducer<any, any>> = {};
Object.entries<Reducer>(slice).forEach(([key, value]) => {
  const newKey = key.replace(/(^\.\/slice-)|(\.ts$)/g, "");
  sliceReducer[newKey] = value;
});
const store = configureStore({
  reducer: {
    ...sliceReducer,
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
  const state = store.getState();
  const {
    auth: { isLogined, invalidTime },
  } = state as any;
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
