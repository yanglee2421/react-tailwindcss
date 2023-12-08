// Redux Toolkit Imports
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

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
import storage from "redux-persist/lib/storage";
import session from "redux-persist/lib/storage/session";

// Slice Imports
import { sliceLoginLocal } from "./slice-login-local";
import { sliceLoginSession } from "./slice-login-session";
import { sliceTheme } from "./slice-theme";
import { sliceApi } from "./slice-api";

// Create Store
export const store = configureStore({
  reducer: persistReducer(
    // Persist Configuration
    {
      key: import.meta.env.VITE_REDUX_PERSISTER_KEY,
      version: 1,
      storage,
      blacklist: [sliceLoginSession.name, sliceApi.reducerPath],
    },

    // Root Reducer
    combineReducers({
      [sliceLoginLocal.name]: sliceLoginLocal.reducer,
      [sliceLoginSession.name]: persistReducer(
        {
          key: sliceLoginSession.name,
          storage: session,
          blacklist: [],
        },
        sliceLoginSession.reducer
      ),
      [sliceTheme.name]: sliceTheme.reducer,
      [sliceApi.reducerPath]: sliceApi.reducer,
    })
  ),

  // ** Middleware
  middleware(getMiddleWare) {
    return getMiddleWare({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(sliceApi.middleware);
  },
});

/**
 * Optional, but required for refetchOnFocus/refetchOnReconnect behaviors
 * See `setupListeners` docs - takes an optional callback as the 2nd arg for customization
 */
setupListeners(store.dispatch);

// Create Persist Store
export const persistor = persistStore(store);

// Store Types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
