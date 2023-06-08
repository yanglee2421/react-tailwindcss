import React, { useContext } from "react";

const gallery = getInitGallery();
export const CtxGallery = React.createContext(gallery);

export const useCtxGallery = () => useContext(CtxGallery);

function getInitGallery() {
  return {
    imgList: [] as string[],
  };
}
