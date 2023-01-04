import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export default gallery;
export const { name, reducer, setIsShow, setImgArr } = gallery;

namespace gallery {
  export const {
    actions: { setIsShow, setImgArr },
    name,
    reducer,
  } = createSlice({
    name: "gallery",
    initialState,
    reducers: {
      setIsShow(state, action: PayloadAction<boolean>) {
        state.isShow = action.payload;
      },
      setImgArr(state, action: PayloadAction<string[]>) {
        state.imgArr = action.payload;
      },
    },
  });
}

function initialState(): type.state {
  return {
    isShow: false,
    imgArr: [],
  };
}

namespace type {
  export interface state {
    isShow: boolean;
    imgArr: string[];
  }
}
