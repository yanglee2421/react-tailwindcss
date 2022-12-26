import { createSlice } from "@reduxjs/toolkit";
import { message } from "antd";
const authSlice = createSlice({
  name: "auth",
  // 状态
  initialState: () => ({
    isLogined: false,
    username: "",
    invalidTime: 0,
  }),
  // 处理
  reducers: {
    loginFn(state, action) {
      const {
        payload: { username, invalidTime },
      } = action;
      state.username = username;
      state.invalidTime = invalidTime;
      state.isLogined = true;
      message.success("登录成功");
    },
    loginoutFn(state) {
      state.username = "";
      state.invalidTime = 0;
      state.isLogined = false;
      localStorage.removeItem("auth");
      localStorage.removeItem("token");
      message.success("登录已注销");
    },
  },
});
export const { loginFn, loginoutFn } = authSlice.actions;
export default authSlice.reducer;
