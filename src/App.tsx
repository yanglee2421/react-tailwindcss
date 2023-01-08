import { RouterProvider } from "react-router-dom";
import { ConfigProvider, Image, theme } from "antd";
import zhCN from "antd/es/locale/zh_CN";
import { useDark } from "@/hook";
import {
  useAppDispatch,
  useAppSelector,
  actIsDark,
  actGalleryIsShow,
} from "@/redux";
import { router } from "@/route";
import React, { useCallback, useMemo } from "react";
/**
 * @function App 使用的类型
 */
export namespace Type {
  export interface onVisibleChange {
    (vis: boolean): void;
  }
}
const { darkAlgorithm, defaultAlgorithm } = theme;
/**
 * React App 的根组件
 * @returns AppJSX
 */
export function App() {
  // 根据 Browser 主题派发 actIsDark
  const dispatch = useAppDispatch();
  useDark((mediaQuery) => dispatch(actIsDark(mediaQuery.matches)));
  // 根据 store 中的 isDark 返回主题样式
  const { isDark, galleryIsShow } = useAppSelector((state) => state.theme);
  const algorithm = useMemo(
    () => (isDark ? darkAlgorithm : defaultAlgorithm),
    [isDark]
  );
  return (
    <ConfigProvider locale={zhCN} theme={{ algorithm }}>
      <RouterProvider router={router} />
      {galleryIsShow && <Gallery />}
    </ConfigProvider>
  );
}
/**
 * 全局相册组件
 * @returns JSX
 */
function Gallery() {
  // 从 store 中取出状态
  const { galleryIsShow, galleryList } = useAppSelector((state) => state.theme);
  const dispatch = useAppDispatch();
  const onVisibleChange = useCallback<Type.onVisibleChange>(
    (vis) => dispatch(actGalleryIsShow(vis)),
    []
  );
  // 生所 Image 数组
  const imgList = useMemo(
    () => galleryList.map((src, index) => <Image key={index} src={src} />),
    [galleryList]
  );
  return (
    <div className="none">
      <Image.PreviewGroup preview={{ visible: galleryIsShow, onVisibleChange }}>
        {imgList}
      </Image.PreviewGroup>
    </div>
  );
}
