import { createSlice, PayloadAction } from "@reduxjs/toolkit";

namespace theme {
  export const {
    actions: { isDarkAct },
    name,
    reducer,
  } = createSlice({
    name: "theme",
    initialState,
    reducers: {
      isDarkAct(state, { payload }: PayloadAction<boolean>) {
        state.isDark = payload;
      },
    },
  });
}

function initialState() {
  return {
    isDark: false,
  };
}

export default theme;
export const { name, reducer, isDarkAct } = theme;
