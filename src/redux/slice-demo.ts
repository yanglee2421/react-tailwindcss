// Redux Toolkit Imports
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export const sliceDemo = createSlice({
  name: "demo",
  initialState,
  reducers: {
    list(state, { payload }: PayloadAction<string[]>) {
      state.list = payload;
    },
    listAdd(state, { payload }: PayloadAction<string>) {
      const isExisted = state.list.includes(payload);
      if (isExisted) return;

      state.list.push(payload);
    },
  },
});

function initialState() {
  return {
    list: [] as string[],
  };
}
