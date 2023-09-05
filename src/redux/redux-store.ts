// Redux Toolkit Imports
import { combineReducers, configureStore, Reducer } from "@reduxjs/toolkit";

// Persist Imports
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
import local from "redux-persist/lib/storage";
import session from "redux-persist/lib/storage/session";

// Slice Imports
import { sliceLoginLocal } from "./slice-login-local";
import { sliceLoginSession } from "./slice-login-session";
import { sliceTheme } from "./slice-theme";
import { sliceDemo } from "./slice-demo";

// Create Reducer
const rootReducer = combineReducers({
  [sliceDemo.name]: sliceDemo.reducer,
  [sliceTheme.name]: sliceTheme.reducer,
  [sliceLoginLocal.name]: sliceLoginLocal.reducer,
  [sliceLoginSession.name]: persistReducer(
    {
      key: sliceLoginSession.name,
      storage: session,
      blacklist: [],
    },
    sliceLoginSession.reducer
  ),
});

// Create Persisted Reducer
const reducer = persistReducer(
  {
    key: "root",
    storage: local,
    blacklist: [sliceLoginSession.name, sliceDemo.name],
  },
  rootReducer
);

// Create Store
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

// Create Persisted Store
export const persistor = persistStore(store);

// ** Types
type RootReducer = typeof rootReducer;
export type RootState = RootReducer extends Reducer<infer R> ? R : unknown;
export type AppDispatch = typeof store.dispatch;
