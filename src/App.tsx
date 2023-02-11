import { RouterProvider } from "react-router-dom";
import { ConfigProvider, Image, theme } from "antd";
import zhCN from "antd/es/locale/zh_CN";
import { withPortal } from "@/component";
import { useDark } from "@/hook";
import { useAppDispatch, useAppSelector, theme as slice } from "@/redux";
import { router } from "@/route";
import React, { useEffect, useMemo, useState } from "react";

export function App() {
  // 根据 Browser 主题派发 actIsDark
  const { darkAlgorithm, defaultAlgorithm } = theme;
  const dispatch = useAppDispatch();
  useDark(({ matches }) => dispatch(slice.actions.actIsDark(matches)));

  // 根据 store 中的 isDark 返回主题样式
  const GalleryWithPortal = withPortal(Gallery);
  const { isDark, galleryIsShow } = useAppSelector((state) => state.theme);
  const gallery = useMemo(() => {
    if (!galleryIsShow) return;
    return <GalleryWithPortal />;
  }, [galleryIsShow]);

  return (
    <ConfigProvider
      locale={zhCN}
      theme={{ algorithm: isDark ? darkAlgorithm : defaultAlgorithm }}
    >
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
        ? dispatch(slice.actions.actGalleryIsShow(true))
        : setTimeout(
            () => dispatch(slice.actions.actGalleryIsShow(false)),
            300
          );
    };

    return (
      <Image.PreviewGroup preview={{ visible, onVisibleChange }}>
        {imgList}
      </Image.PreviewGroup>
    );
  }, [visible, imgList]);

  return <div className="none">{imgGroup}</div>;
}
