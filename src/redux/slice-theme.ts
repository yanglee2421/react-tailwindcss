import { createSlice, PayloadAction } from "@reduxjs/toolkit";
/**
 * 初始状态
 */
function initialState() {
  return { isDark: false };
}
/**
 * 切片
 */
namespace theme {
  export const {
    actions: { actIsDark },
    name,
    reducer,
  } = createSlice({
    name: "theme",
    initialState,
    reducers: {
      actIsDark(state, { payload }: PayloadAction<boolean>) {
        state.isDark = Boolean(payload);
      },
    },
  });
}

export default theme;
export const { name, reducer, actIsDark } = theme;
