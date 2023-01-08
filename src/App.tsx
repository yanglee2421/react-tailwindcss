import { RouterProvider } from "react-router-dom";
import { ConfigProvider, Image, theme } from "antd";
import zhCN from "antd/es/locale/zh_CN";
import { withPortal } from "@/component";
import { useDark } from "@/hook";
import {
  useAppDispatch,
  useAppSelector,
  actIsDark,
  actGalleryIsShow,
} from "@/redux";
import { router } from "@/route";
import React, { useCallback, useEffect, useMemo, useState } from "react";
const { darkAlgorithm, defaultAlgorithm } = theme;
const GalleryWithPortal = withPortal(Gallery);
/**
 * @function App 使用的类型
 */
export namespace Type {
  export interface onVisibleChange {
    (vis: boolean): void;
  }
}
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
      {galleryIsShow && <GalleryWithPortal />}
    </ConfigProvider>
  );
}
/**
 * 全局相册组件
 * @returns JSX
 */
function Gallery() {
  const [visible, setVisible] = useState(false);
  // state 跟随 store
  const { galleryIsShow, galleryList } = useAppSelector((state) => state.theme);
  useEffect(() => setVisible(galleryIsShow), [galleryIsShow]);
  // 关闭事件，打开立即触发，关闭则需要延迟 300ms 等过渡结束
  const dispatch = useAppDispatch();
  const onVisibleChange = useCallback<Type.onVisibleChange>((vis) => {
    setVisible(vis);
    vis
      ? dispatch(actGalleryIsShow(true))
      : setTimeout(() => dispatch(actGalleryIsShow(false)), 300);
  }, []);
  // 生所 Image 数组
  const imgList = useMemo(
    () => galleryList.map((src, index) => <Image key={index} src={src} />),
    [galleryList]
  );
  return (
    <div className="none">
      <Image.PreviewGroup preview={{ visible, onVisibleChange }}>
        {imgList}
      </Image.PreviewGroup>
    </div>
  );
}
