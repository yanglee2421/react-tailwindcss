import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { authApi } from "@/api/api-rtkq";
import { login } from "./slice-login";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const rootReducers = combineReducers({
  // [authApi.reducerPath]: authApi.reducer,
  [login.name]: login.reducer,
});

export const store = configureStore({
  // reducer: {
  //   [authApi.reducerPath]: authApi.reducer,
  //   [login.name]: login.reducer,
  // },
  reducer: persistReducer(
    {
      key: "root",
      version: 1,
      storage,
    },
    rootReducers
  ),
  middleware(getMiddleWare) {
    return getMiddleWare().concat(authApi.middleware);
  },
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

/**
 * 设置 setupListeners 以支持以下属性
 * 1. refetchOnReconnect
 * 2. refetchOnFocus
 */
setupListeners(store.dispatch);
