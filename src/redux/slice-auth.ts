import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { message } from "antd";

export const sliceAuth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    actSignOut(state) {
      const initialData = getInitialData();
      Object.assign(state, initialData);
    },
    actSignIn(state, { payload }: PayloadAction<initialData>) {
      Object.assign(state, payload);
    },
  },
});

export type initialData = ReturnType<typeof getInitialData>;

function getInitialData() {
  return {
    user: "",
    token: "",
    expiration: 0,
  };
}

function initialState() {
  const auth = getInitialData();
  try {
    const prevJson = localStorage.getItem("auth");
    if (!prevJson) return auth;

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
  return auth;
}
