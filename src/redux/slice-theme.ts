import { createSlice, PayloadAction } from "@reduxjs/toolkit";

namespace theme {
  export const {
    actions: { docTitleAct, isDarkAct },
    name,
    reducer,
  } = createSlice({
    name: "theme",
    initialState,
    reducers: {
      isDarkAct(state, { payload }: PayloadAction<boolean>) {
        state.isDark = Boolean(payload);
      },
      docTitleAct(state, { payload }: PayloadAction<string>) {
        if (typeof payload !== "string") return;
        state.docTitle = payload;
      },
    },
  });
}

function initialState() {
  return {
    isDark: false,
    docTitle: "加载中。。。",
  };
}

export default theme;
export const { name, reducer, docTitleAct, isDarkAct } = theme;
