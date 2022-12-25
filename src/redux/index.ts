import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import rtkq from "@/api/rtkq";
import * as reducer from "./slice";
import { loginoutFn } from "./slice/auth";
const store = configureStore({
  reducer: {
    ...reducer,
    [rtkq.reducerPath]: rtkq.reducer,
  },
  middleware: (getMiddleWare) => getMiddleWare().concat(rtkq.middleware),
});
// 设置以后支持refetchOnReconnect、refetchOnFocus
setupListeners(store.dispatch);
// 订阅功能
let timer: NodeJS.Timeout;
const un = store.subscribe(() => {
  const {
    auth: { isLogined, maxtime },
  } = store.getState();
  console.log(isLogined, maxtime);
  if (isLogined && maxtime) {
    timer = setTimeout(() => {
      store.dispatch(loginoutFn());
      console.log("loginout");
    }, maxtime - Date.now());
    return;
  }
  clearTimeout(timer);
});
export default store;
