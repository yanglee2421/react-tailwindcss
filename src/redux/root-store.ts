import { combineReducers, configureStore, Reducer } from "@reduxjs/toolkit";

// Persist
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
import storage from "redux-persist/lib/storage/session";

// Slice
import { sliceLogin } from "./slice-login";
import { sliceTheme } from "./slice-theme";

const rootReducer = combineReducers({
  [sliceLogin.name]: sliceLogin.reducer,
  [sliceTheme.name]: sliceTheme.reducer,
});

const reducer = persistReducer(
  {
    key: "root",
    version: 1,
    storage,
  },
  rootReducer
);

export const store = configureStore({
  reducer,
  middleware(getMiddleWare) {
    return getMiddleWare({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    });
  },
});

export const persistor = persistStore(store);

export type RootState = typeof rootReducer extends Reducer<infer R, any>
  ? R
  : unknown;
export type AppDispatch = typeof store.dispatch;
