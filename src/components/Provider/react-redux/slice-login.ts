import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const login = createSlice({
  name: "login",
  initialState,
  reducers: {
    isLogined(state, { payload }: PayloadAction<boolean>) {
      state.isLogined = payload;
    },
  },
});

function initialState() {
  return {
    isLogined: false,
  };
}
