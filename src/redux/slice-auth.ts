import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { message } from "antd";

export const sliceAuth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    actSignOut(state) {
      const nullLogin = getNullLogin();
      state.login = nullLogin;
    },
    actSignIn(state, { payload }: PayloadAction<LoginData>) {
      state.login = payload;
    },
    actTimer(state, { payload }: PayloadAction<NodeJS.Timeout | number>) {
      state.timer = payload;
    },
  },
});

export type LoginData = ReturnType<typeof getNullLogin>;

interface State {
  login: LoginData;
  timer: NodeJS.Timeout | number;
}

function initialState(): State {
  const login = getInitLogin();
  return {
    login,
    timer: 0,
  };
}

function getNullLogin() {
  return {
    user: "",
    token: "",
    expiration: 0,
  };
}

function getInitLogin() {
  const login = getNullLogin();

  // Restore login status from localstorage
  try {
    const prevJson = localStorage.getItem("auth");
    if (!prevJson) return login;

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

    Object.assign(login, { user, token, expiration });
  } catch (err) {
    console.error(err);
    localStorage.removeItem("auth");
    localStorage.removeItem("token");
    message.warning("登录信息已失效");
  }
  return login;
}
