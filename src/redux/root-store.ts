import { combineReducers, configureStore, Reducer } from "@reduxjs/toolkit";
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

const rootReducer = combineReducers({
  [login.name]: login.reducer,
});

const persistedReducer = persistReducer(
  {
    key: "root",
    version: 1,
    storage,
  },
  rootReducer
);

export const store = configureStore({
  reducer: persistedReducer,
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
