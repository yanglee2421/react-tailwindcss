import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export const sliceLogin = createSlice({
  name: "login",
  initialState,
  reducers: {
    actSetState(state, { payload }: PayloadAction<boolean>) {
      state.isLogined = payload;
    },
  },
});

interface State {
  isLogined: boolean;
}

function initialState(): State {
  return {
    isLogined: false,
  };
}
