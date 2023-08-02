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
import storage from "redux-persist/lib/storage/session";

// Slice Imports
import { sliceLogin } from "./slice-login";
import { sliceTheme } from "./slice-theme";
import { sliceDemo } from "./slice-demo";

// Create Reducer
const rootReducer = combineReducers({
  [sliceLogin.name]: sliceLogin.reducer,
  [sliceTheme.name]: sliceTheme.reducer,
  [sliceDemo.name]: sliceDemo.reducer,
});

// Create Persisted Reducer
const reducer = persistReducer(
  {
    key: "root",
    version: 1,
    storage,
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
export type RootState = RootReducer extends Reducer<infer R, any> ? R : unknown;
export type AppDispatch = typeof store.dispatch;
