import { createSlice, PayloadAction } from "@reduxjs/toolkit";
export namespace Type {
  export interface state {
    isDark: boolean;
    galleryIsShow: boolean;
    galleryList: string[];
  }
}
/**
 * 初始状态
 */
function initialState(): Type.state {
  return {
    isDark: false,
    galleryIsShow: false,
    galleryList: [],
  };
}
/**
 * 切片
 */
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
