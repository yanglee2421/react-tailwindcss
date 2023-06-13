import { setupListeners } from "@reduxjs/toolkit/query";
import { configureStore, combineReducers, Reducer } from "@reduxjs/toolkit";

// Persist
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

// Slice
import { sliceLogin } from "./slice-login";
import { apiRtkq } from "./api-rtkq";

// Create reducer
const rootReducer = combineReducers({
  [apiRtkq.reducerPath]: apiRtkq.reducer,
  [sliceLogin.name]: sliceLogin.reducer,
});

// Create persist reducer
const reducer = persistReducer(
  {
    storage,
    version: 1,
    key: "root",
  },
  rootReducer
);

// Create store
export const store = configureStore({
  reducer,
  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware({
      /**
       * One of the core usage principles for Redux is that
       * you should not put non-serializable values in state or actions.
       * However, like most rules, there are exceptions.
       */
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
