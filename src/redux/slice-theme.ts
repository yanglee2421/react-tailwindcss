import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const theme = createSlice({
  name: "theme",
  initialState,
  reducers: {
    actIsDark(state, { payload }: PayloadAction<boolean>) {
      state.isDark = Boolean(payload);
    },
    actGalleryIsShow(state, { payload }: PayloadAction<boolean>) {
      state.galleryIsShow = payload;
    },
    actGalleryList(state, { payload }: PayloadAction<string[]>) {
      state.galleryList = payload;
    },
  },
});

interface initialState {
  isDark: boolean;
  galleryIsShow: boolean;
  galleryList: string[];
}
function initialState(): initialState {
  return {
    isDark: false,
    galleryIsShow: false,
    galleryList: [],
  };
}
