import { createSlice } from "@reduxjs/toolkit";
import { message } from "antd";
const authSlice = createSlice({
  name: "auth",
  // 状态
  initialState: () => ({
    isLogined: false,
    username: "",
    maxtime: 0,
  }),
  // 处理
  reducers: {
    loginFn(state, action) {
      const {
        payload: { username, maxtime, token },
      } = action;
      state.username = username;
      state.maxtime = maxtime;
      state.isLogined = true;
      localStorage.setItem("authState", JSON.stringify(state));
      localStorage.setItem("token", token);
      message.success("已登录");
    },
    loginoutFn(state) {
      state.username = "";
      state.maxtime = 0;
      state.isLogined = false;
      localStorage.removeItem("authState");
      localStorage.removeItem("token");
      message.success("登录已注销");
    },
  },
});
export const { loginFn, loginoutFn } = authSlice.actions;
export default authSlice.reducer;
