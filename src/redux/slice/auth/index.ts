import { createSlice } from "@reduxjs/toolkit";
let timer: NodeJS.Timeout;
const authSlice = createSlice({
  name: "auth",
  // 状态
  initialState: () => {
    const defaultState = {
      isLogined: false,
      username: "",
      maxtime: 0,
    };
    const prevState = localStorage.getItem("authState");
    if (prevState) {
      return JSON.parse(prevState);
    }
    return defaultState;
  },
  // 处理
  reducers: {
    loginFn(state, action) {
      state.isLogined = true;
      state.username = action.payload.username;
      timer = setTimeout(() => {}, state.maxtime - Date.now());
    },
    loginoutFn(state) {
      state.isLogined = false;
      state.username = "";
      clearTimeout(timer);
    },
  },
});
export const { loginFn, loginoutFn } = authSlice.actions;
export default authSlice;
