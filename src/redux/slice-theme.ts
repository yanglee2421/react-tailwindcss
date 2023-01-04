import { createSlice, PayloadAction } from "@reduxjs/toolkit";
export default theme;
export const name = theme.name;
export const reducer = theme.reducer;
export const setIsDarkAct = theme.setIsDarkAct;
function initialState() {
  return {
    isDark: false,
  };
}
namespace theme {
  export const {
    actions: { setIsDarkAct },
    name,
    reducer,
  } = createSlice({
    name: "theme",
    initialState,
    reducers: {
      setIsDarkAct(state, { payload }: PayloadAction<boolean>) {
        state.isDark = payload;
      },
    },
  });
}
