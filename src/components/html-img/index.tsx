// Assets Imports
import img640 from "@/assets/img/640.jpg";
import img750 from "@/assets/img/750.jpg";
import img750p from "@/assets/img/750.webp";
import img1297 from "@/assets/img/1297.jpg";

export function HtmlImg() {
  // ** SrcSet
  const srcMap = new Map<number, string>();
  srcMap.set(640, img640);
  srcMap.set(750, img750);
  srcMap.set(750, img750p);
  srcMap.set(1297, img1297);

  const srcIterator = srcMap.entries();
  const srcSet = Array.from(srcIterator)
    .map(([width, src]) => `${src} ${width}w`)
    .join(", ");

  // ** Sizes
  const sizeMap = new Map<string, number>();
  sizeMap.set("(max-width: 575px)", 375);
  sizeMap.set("(min-width: 576px) and (max-width: 767px)", 576);
  sizeMap.set("(min-width: 768px) and (max-width: 991px)", 768);
  sizeMap.set("(min-width: 992px) and (max-width: 1199px)", 992);
  sizeMap.set("(min-width: 1200px) and (max-width: 1399px)", 1200);
  sizeMap.set("(min-width: 1400px)", 1297);

  const sizeIterator = sizeMap.entries();
  const sizes = Array.from(sizeIterator)
    .map(([media, width]) => `${media} ${width}px`)
    .join(", ");

  return <img srcSet={srcSet} sizes={sizes} alt="avatar" />;
}
