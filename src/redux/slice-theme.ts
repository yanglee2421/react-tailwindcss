// RTK Imports
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const sliceTheme = createSlice({
  name: "theme",
  initialState,
  reducers: {
    reset(s) {
      Object.assign(s, initialState());
    },
    mode(s, { payload }: PayloadAction<Theme["mode"]>) {
      s.mode = payload;
    },
    bgAlpha(s, { payload }: PayloadAction<number>) {
      s.bgAlpha = payload;
    },
    bgBlur(s, { payload }: PayloadAction<number>) {
      s.bgBlur = payload;
    },
  },
});

function initialState(): Theme {
  return {
    mode: "auto",
    bgAlpha: 0,
    bgBlur: 0,
  };
}

interface Theme {
  mode: "dark" | "light" | "auto";
  bgAlpha: number;
  bgBlur: number;
}
