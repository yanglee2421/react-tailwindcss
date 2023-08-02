// Redux Imports
import { Provider } from "react-redux";

// Persist Imports
import { PersistGate } from "redux-persist/integration/react";

// React Imports
import React from "react";

// Store Imports
import { store, persistor } from "./redux-store";

export function ReduxProvider(props: React.PropsWithChildren) {
  // ** Props
  const { children } = props;

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>{children}</PersistGate>
    </Provider>
  );
}
