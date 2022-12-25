import { createSlice } from "@reduxjs/toolkit";
namespace Type {
  export interface state {
    isLogined: boolean;
    username: string;
    maxtime: number;
  }
}
const authSlice = createSlice({
  name: "auth",
  // 状态
  initialState: () => {
    const defaultState = {
      isLogined: false,
      username: "",
      maxtime: 0,
    };
    try {
      const prevStaStr = localStorage.getItem("authState") || "{}";
      const prevState = JSON.parse(prevStaStr) as Type.state;
      if (prevState.maxtime > Date.now()) return prevState;
    } catch {
      localStorage.removeItem("authState");
    }
    return defaultState;
  },
  // 处理
  reducers: {
    loginFn(state, action) {
      state.isLogined = true;
      state.username = action.payload.username;
      state.maxtime = action.payload.maxtime;
      localStorage.setItem("authState", JSON.stringify(state));
    },
    loginoutFn(state) {
      state.isLogined = false;
      state.username = "";
      state.maxtime = 0;
    },
  },
});
export const { loginFn, loginoutFn } = authSlice.actions;
export default authSlice.reducer;
