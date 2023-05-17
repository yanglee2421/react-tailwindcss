import {
  PayloadAction,
  configureStore,
  createSlice,
  combineReducers,
  Reducer,
} from "@reduxjs/toolkit";
import React from "react";
import { Provider } from "react-redux";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import storage from "redux-persist/lib/storage/session";

const slice = createSlice({
  name: "login",
  initialState,
  reducers: {
    isLogined(state, { payload }: PayloadAction<boolean>) {
      state.isLogined = payload;
    },
  },
});

const rootReducer = combineReducers({
  [slice.name]: slice.reducer,
});

const persistedReducucer = persistReducer(
  {
    storage,
    version: 1,
    key: "root",
  },
  rootReducer
);

const store = configureStore({
  reducer: persistedReducucer,
  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    });
  },
});

const persistedStore = persistStore(store);

export function ReduxProvider(props: React.PropsWithChildren) {
  const { children } = props;
  return (
    <Provider store={store}>
      <PersistGate persistor={persistedStore}>{children}</PersistGate>
    </Provider>
  );
}

function initialState() {
  return {
    isLogined: false,
  };
}

export type RootState = typeof rootReducer extends Reducer<infer R, any>
  ? R
  : unknown;
export type AppDispatch = typeof store.dispatch;
