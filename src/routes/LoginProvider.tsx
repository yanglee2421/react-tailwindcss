import React, { useMemo, useRef, useState } from "react";
import { CtxLogin, getInitialValue } from "./CtxLogin";
import { message } from "antd";

type LoginState = ReturnType<typeof getInitState>;

export function LoginProvider(props: React.PropsWithChildren) {
  const { children } = props;

  const [state, setState] = useState(() => getInitState());

  const timerRef = useRef<NodeJS.Timeout | number>(0);

  const signOut = () => {
    clearTimeout(timerRef.current);
    const nextState = getInitialValue().state;
    setState(nextState);
    localStorage.removeItem("auth");
  };
  const signIn = (nextState: LoginState, isRemember: boolean = false) => {
    timerRef.current = setTimeout(signOut, nextState.expiration - Date.now());
    setState(nextState);
    if (isRemember) {
      localStorage.setItem("auth", JSON.stringify(nextState));
    }
  };

  const value = useMemo(() => ({ state, signOut, signIn }), [state]);
  return <CtxLogin.Provider value={value}>{children}</CtxLogin.Provider>;
}

function getInitState() {
  const initialValue = getInitialValue().state;

  try {
    const prevJson = localStorage.getItem("auth");
    if (!prevJson) return initialValue;

    const prevAuth = JSON.parse(prevJson);
    const { user, token, expiration } = prevAuth;
    if (!user || !token || !expiration)
      throw new TypeError("one or more fields are empty");
    if (typeof user !== "string")
      throw new TypeError("field user is not a string");
    if (typeof token !== "string")
      throw new TypeError("field token is not a string");
    if (typeof expiration !== "number")
      throw new TypeError("field expiration isn`t a number");
    if (expiration - Date.now() < 1000 * 60 * 5)
      throw new Error("Login information has expired");

    return { user, token, expiration };
  } catch (err) {
    console.error(err);
    localStorage.removeItem("auth");
    localStorage.removeItem("token");
    message.warning("登录信息已失效");
  }
  return initialValue;
}
