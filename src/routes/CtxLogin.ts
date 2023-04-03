import React from "react";

const inititalValue = getInitLoginState();
export const CtxLogin = React.createContext(inititalValue);

export function getInitLoginState() {
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
