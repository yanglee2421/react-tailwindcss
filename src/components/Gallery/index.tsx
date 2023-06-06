// @ts-nocheck
import { useMemo } from "react";
import { useAppDispatch, useAppSelector, theme } from "@/redux";
import { Image } from "antd";
import { withPortal } from "@/components";

export function Gallery() {
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
      dispatch(theme.actions.actGalleryIsShow(vis));

    return (
      <Image.PreviewGroup preview={{ visible: galleryIsShow, onVisibleChange }}>
        {imgList}
      </Image.PreviewGroup>
    );
  }, [galleryIsShow, imgList]);

  return <div className="none">{imgGroup}</div>;
}

export const GalleryWithPortal = withPortal(Gallery);
