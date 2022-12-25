import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import rtkq from "@/api/rtkq";
import * as reducer from "./slice";
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
const un = store.subscribe(() => {
  const {
    auth: {},
  } = store.getState();
  un();
});
export default store;
