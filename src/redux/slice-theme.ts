import { createSlice, PayloadAction } from "@reduxjs/toolkit";
/**
 * 初始状态
 */
function initialState() {
  return {
    isDark: false,
    docTitle: "加载中。。。",
  };
}
/**
 * 切片
 */
namespace theme {
  export const {
    actions: { actDocTitle, actIsDark },
    name,
    reducer,
  } = createSlice({
    name: "theme",
    initialState,
    reducers: {
      actIsDark(state, { payload }: PayloadAction<boolean>) {
        state.isDark = Boolean(payload);
      },
      actDocTitle(state, { payload }: PayloadAction<string>) {
        if (typeof payload !== "string") return;
        state.docTitle = payload;
      },
    },
  });
}

export default theme;
export const { name, reducer, actDocTitle, actIsDark } = theme;
