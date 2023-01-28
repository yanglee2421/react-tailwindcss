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
import React, { useEffect, useMemo, useState } from "react";
const { darkAlgorithm, defaultAlgorithm } = theme;
const GalleryWithPortal = withPortal(Gallery);

/**
 * React App 的根组件
 * @returns AppJSX
 */
export function App() {
  // 根据 Browser 主题派发 actIsDark
  const dispatch = useAppDispatch();
  useDark(({ matches }) => dispatch(actIsDark(matches)));

  // 根据 store 中的 isDark 返回主题样式
  const { isDark, galleryIsShow } = useAppSelector((state) => state.theme);
  const theme = useMemo(
    () => ({ algorithm: isDark ? darkAlgorithm : defaultAlgorithm }),
    [isDark]
  );
  const gallery = useMemo(() => {
    if (!galleryIsShow) return;
    return <GalleryWithPortal />;
  }, [galleryIsShow]);

  return (
    <ConfigProvider locale={zhCN} theme={theme}>
      <RouterProvider router={router} />
      {gallery}
    </ConfigProvider>
  );
}

function Gallery() {
  // state 跟随 store
  const [visible, setVisible] = useState(false);
  const { galleryIsShow, galleryList } = useAppSelector((state) => state.theme);
  useEffect(() => setVisible(galleryIsShow), [galleryIsShow]);

  // Image 数组
  const imgList = useMemo(
    () => galleryList.map((src) => <Image key={src} src={src} />),
    [galleryList]
  );

  // 画廊主体
  const dispatch = useAppDispatch();
  const imgGroup = useMemo(() => {
    const onVisibleChange = (vis: boolean) => {
      setVisible(vis);
      vis
        ? dispatch(actGalleryIsShow(true))
        : setTimeout(() => dispatch(actGalleryIsShow(false)), 300);
    };

    return (
      <Image.PreviewGroup preview={{ visible, onVisibleChange }}>
        {imgList}
      </Image.PreviewGroup>
    );
  }, [visible, imgList]);

  return <div className="none">{imgGroup}</div>;
}
