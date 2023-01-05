import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { message } from "antd";
/**
 * 类型
 */
namespace Type {
  export interface auth {
    isLogined: boolean;
    username: string;
    invalidTime: number;
    token: string;
    remember: boolean;
  }
}
/**
 * 初始状态
 */
function initialState() {
  const auth = {
    isLogined: false,
    username: "",
    invalidTime: 0,
  };
  try {
    const prevAuthStr = localStorage.getItem("auth");
    if (!prevAuthStr) return auth;
    const prevToken = localStorage.getItem("token");
    if (!prevToken) return auth;
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
}
/**
 * 切片
 */
namespace auth {
  export const {
    actions: { actLogin, actSignOut },
    name,
    reducer,
  } = createSlice({
    name: "auth",
    initialState,
    reducers: {
      actLogin(state, { payload }: PayloadAction<Type.auth>) {
        const { username, invalidTime, token, remember } = payload;
        state.username = username;
        state.invalidTime = invalidTime;
        state.isLogined = true;
        if (remember) {
          localStorage.setItem("auth", JSON.stringify(state));
          localStorage.setItem("token", token);
        }
        message.success("登录成功");
      },
      actSignOut(state) {
        state.username = "";
        state.invalidTime = 0;
        state.isLogined = false;
        localStorage.removeItem("auth");
        localStorage.removeItem("token");
        message.success("登录已注销");
      },
    },
  });
}

export default auth;
export const { name, reducer, actLogin, actSignOut } = auth;
