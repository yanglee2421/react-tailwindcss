import { createSlice, PayloadAction } from "@reduxjs/toolkit";
/**
 * 类型
 */
namespace type {
  export interface state {
    isShow: boolean;
    imgArr: string[];
  }
}
/**
 * 初始状态
 */
function initialState(): type.state {
  return {
    isShow: false,
    imgArr: [],
  };
}
/**
 * 切片
 */
namespace gallery {
  export const {
    actions: { actIsShow, actImgArr },
    name,
    reducer,
  } = createSlice({
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
}

export default gallery;
export const { name, reducer, actIsShow, actImgArr } = gallery;
