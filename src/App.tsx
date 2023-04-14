import { RouterProvider } from "react-router-dom";
import { ConfigProvider, Image, theme } from "antd";
import { withPortal } from "@/components";
import { useDark } from "@/hooks";
import { useAppDispatch, useAppSelector, theme as slice } from "@/redux";
import { router } from "@/routes";
import React, { useMemo } from "react";

export function App() {
  // 根据 Browser 主题派发 actIsDark
  const dispatch = useAppDispatch();
  useDark(({ matches }) => dispatch(slice.actions.actIsDark(matches)));

  // 根据 store 中的 isDark 返回主题样式
  const GalleryWithPortal = withPortal(Gallery);

  const { darkAlgorithm, defaultAlgorithm } = theme;
  const isDark = useAppSelector((state) => state.theme.isDark);
  const algorithm = isDark ? darkAlgorithm : defaultAlgorithm;

  return (
    <ConfigProvider theme={{ algorithm }}>
      <RouterProvider router={router} />
      <GalleryWithPortal />
    </ConfigProvider>
  );
}

function Gallery() {
  const { galleryIsShow, galleryList } = useAppSelector((state) => state.theme);

  // Image 数组
  const imgList = useMemo(
    () => galleryList.map((src) => <Image key={src} src={src} />),
    [galleryList]
  );

  // 画廊主体
  const dispatch = useAppDispatch();
  const imgGroup = useMemo(() => {
    const onVisibleChange = (vis: boolean) =>
      dispatch(slice.actions.actGalleryIsShow(vis));

    return (
      <Image.PreviewGroup preview={{ visible: galleryIsShow, onVisibleChange }}>
        {imgList}
      </Image.PreviewGroup>
    );
  }, [galleryIsShow, imgList]);

  return <div className="none">{imgGroup}</div>;
}
