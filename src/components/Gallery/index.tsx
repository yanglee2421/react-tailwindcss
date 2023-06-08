import React, { useMemo, useState } from "react";
import { Image } from "antd";
import { CtxGallery } from "@/hooks";

interface GalleryProps extends React.PropsWithChildren {}

export function Gallery(props: GalleryProps) {
  const { children } = props;

  const [imgList, setImgList] = useState<string[]>([]);

  // Preview element
  const galleryEl = useMemo(() => {
    const visible = !!imgList.length;
    const onVisibleChange = (isVis: boolean) => {
      if (isVis) return;
      setImgList([]);
    };

    const imgEl = imgList.map((src) => <Image key={src} src={src} />);

    return (
      <Image.PreviewGroup preview={{ visible, onVisibleChange }}>
        {imgEl}
      </Image.PreviewGroup>
    );
  }, [imgList]);

  return (
    <CtxGallery.Provider value={{ imgList }}>
      <div className="none">{galleryEl}</div>
      {children}
    </CtxGallery.Provider>
  );
}
