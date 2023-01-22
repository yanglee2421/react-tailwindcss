import { Card, Carousel, Image } from "antd";
import { useBingQuery } from "@/api/api-rtkq";
import { useMemo } from "react";
export function BingCard() {
  const { data } = useBingQuery();
  const imgArr = useMemo(() => {
    if (data?.isOk) {
      return data.rows.map((src) => (
        <Image key={src} src={src} width="100%" height={270} />
      ));
    }
  }, [data]);
  return (
    <Card>
      <Carousel
        draggable={false}
        dotPosition="bottom"
        effect="fade"
        autoplay
        className="h-100"
      >
        {imgArr}
      </Carousel>
    </Card>
  );
}
