import React from "react";

const inititalValue = getInitialValue();
export const CtxLogin = React.createContext(inititalValue);

interface LoginState {
  user: string;
  token: string;
  expiration: number;
}

interface InititalValue {
  state: LoginState;
  signIn(state: LoginState, isRemember?: boolean): void;
  signOut(): void;
}

export function getInitialValue(): InititalValue {
  return {
    state: {
      user: "",
      token: "",
      expiration: 0,
    },
    signIn() {},
    signOut() {},
  };
}
