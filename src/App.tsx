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
import React, { useCallback, useEffect, useMemo, useState } from "react";
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
      {Boolean(galleryIsShow) && <Gallery />}
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
  // 生成一个 state 管理组件，并和 store 随动
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    setVisible((prev) => galleryIsShow);
  }, [galleryIsShow]);
  /**
   * visible 变化时：
   * 1.若为true，则直接派发 action
   * 2.若为false，则 300ms 后派发 action
   */
  const dispatch = useAppDispatch();
  const onVisibleChange = useCallback<Type.onVisibleChange>((vis) => {
    setVisible((prev) => vis);
    if (vis) {
      dispatch(actGalleryIsShow(true));
      return;
    }
    setTimeout(() => {
      dispatch(actGalleryIsShow(false));
    }, 300);
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
