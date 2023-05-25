import { configureStore, combineReducers, Reducer } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { login } from "./slice-login";
import { rtkq } from "./rtkq";

// Redux persist
import { persistStore } from "redux-persist";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage/session";

// Create rootReducer
const rootReducer = combineReducers({
  [login.name]: login.reducer,
  [rtkq.reducerPath]: rtkq.reducer,
});

// Create persist reducer
const persistedReducucer = persistReducer(
  {
    storage,
    version: 1,
    key: "root",
  },
  rootReducer
);

// Create store
export const store = configureStore({
  reducer: persistedReducucer,
  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    });
  },
});

// Enable refetchOnReconnect & refetchOnFocus
setupListeners(store.dispatch);

// Create persist store
export const persistedStore = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = typeof rootReducer extends Reducer<infer R, any>
  ? R
  : unknown;
