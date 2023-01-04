import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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

function initialState() {
  return {
    isDark: false,
  };
}

export default theme;
export const { name, reducer, setIsDarkAct } = theme;
