import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const gallery = createSlice({
  name: "gallery",
  initialState,
  reducers: {
    actIsShow(state, { payload }: PayloadAction<boolean>) {
      state.isShow = payload;
    },
    actImgArr(state, { payload }: PayloadAction<string[]>) {
      state.imgArr = payload;
    },
  },
});

interface state {
  isShow: boolean;
  imgArr: string[];
}
function initialState(): state {
  return {
    isShow: false,
    imgArr: [],
  };
}
