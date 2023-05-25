import React from "react";
import { Provider } from "react-redux";
import { store, persistor } from "./root-store";
import { PersistGate } from "redux-persist/integration/react";

interface ReactReduxProps extends React.PropsWithChildren {}
export function ReactRedux(props: ReactReduxProps) {
  const { children } = props;
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>{children}</PersistGate>
    </Provider>
  );
}
