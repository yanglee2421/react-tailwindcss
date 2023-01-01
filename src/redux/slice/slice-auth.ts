import { createSlice } from "@reduxjs/toolkit";
import { message } from "antd";
const authSlice = createSlice({
  name: "auth",
  // 状态
  initialState: () => {
    const auth = {
      isLogined: false,
      username: "",
      invalidTime: 0,
    };
    try {
      const prevAuthStr = localStorage.getItem("auth") || "{}";
      const prevAuth = JSON.parse(prevAuthStr) as typeof auth;
      if (prevAuth.invalidTime - Date.now() > 1000 * 60) {
        return Object.assign(auth, prevAuth);
      }
      throw new Error("原登录信息已失效");
    } catch (err: any) {
      message.warning(err.message);
      localStorage.removeItem("auth");
      localStorage.removeItem("token");
    }
    return auth;
  },
  // 处理
  reducers: {
    loginAct(state, action) {
      const {
        payload: { username, invalidTime, token, remember },
      } = action;
      state.username = username;
      state.invalidTime = invalidTime;
      state.isLogined = true;
      if (remember) {
        localStorage.setItem("auth", JSON.stringify(state));
        localStorage.setItem("token", token);
      }
      message.success("登录成功");
    },
    loginoutAct(state) {
      state.username = "";
      state.invalidTime = 0;
      state.isLogined = false;
      localStorage.removeItem("auth");
      localStorage.removeItem("token");
      message.success("登录已注销");
    },
  },
});
export const { loginAct, loginoutAct } = authSlice.actions;
export default authSlice.reducer;
