import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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

namespace type {
  export interface state {
    isShow: boolean;
    imgArr: string[];
  }
}

function initialState(): type.state {
  return {
    isShow: false,
    imgArr: [],
  };
}

export default gallery;
export const { name, reducer, setIsShow, setImgArr } = gallery;
