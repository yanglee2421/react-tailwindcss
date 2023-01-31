import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "./root-store";
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export { store } from "./root-store";
export { actImgArr, actIsShow } from "./slice-gallery";
export { actIsDark, actGalleryIsShow, actGalleryList } from "./slice-theme";
