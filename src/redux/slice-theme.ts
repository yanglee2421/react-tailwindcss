import { createSlice, PayloadAction } from "@reduxjs/toolkit";

namespace theme {
  export const {
    actions: { actIsDark, actGalleryIsShow, actGalleryList },
    name,
    reducer,
  } = createSlice({
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
}

export default theme;
export const { name, reducer, actIsDark, actGalleryIsShow, actGalleryList } =
  theme;

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
