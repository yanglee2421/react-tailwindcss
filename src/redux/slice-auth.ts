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
    token: "",
  };
  try {
    const prevJson = localStorage.getItem("auth");
    if (!prevJson) return auth;
    const prevState = JSON.parse(prevJson);
    const { username, invalidTime, token } = prevState;
    if (!username || !invalidTime || !token) throw new Error();
    if (typeof username !== "string") throw new Error();
    if (typeof invalidTime !== "number") throw new Error();
    if (invalidTime < Date.now() + 1000 * 60 * 15) throw new Error();
    if (typeof token !== "string") throw new Error();
    Object.assign(auth, { username, invalidTime, token, isLogined: true });
    localStorage.setItem("token", token);
  } catch {
    localStorage.removeItem("auth");
    localStorage.removeItem("token");
    message.warning("原登录信息已失效");
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
        Object.assign(state, { username, invalidTime, token, isLogined: true });
        message.success("登录成功");
        if (!remember) return;
        localStorage.setItem("auth", JSON.stringify(state));
        localStorage.setItem("token", token);
      },
      actSignOut(state) {
        Object.assign(state, {
          isLogined: false,
          username: "",
          invalidTime: 0,
          token: "",
        });
        localStorage.removeItem("auth");
        localStorage.removeItem("token");
        message.success("登录已注销");
      },
    },
  });
}

export default auth;
export const { name, reducer, actLogin, actSignOut } = auth;
