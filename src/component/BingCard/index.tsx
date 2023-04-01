import { Avatar, Card, CardProps, Carousel, Image } from "antd";
import {
  VerticalLeftOutlined,
  PlayCircleOutlined,
  PauseOutlined,
  VerticalRightOutlined,
} from "@ant-design/icons";
import { useBingQuery } from "@/apis/api-rtkq";
import { useMemo, useRef, useState } from "react";
import avatar from "@/assets/image/avatar/ssw.jpg";

export function BingCard(props: CardProps) {
  const { children, ...restProps } = props;

  // 走马灯中的图片
  const { data } = useBingQuery();
  const imgArr = useMemo(() => {
    if (!data?.isOk) return;
    return data.rows.map((src) => <Image key={src} src={src} width="100%" />);
  }, [data]);

  // 走马灯
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const carRef = useRef<any>(null);
  const carousel = useMemo(
    () => (
      <Carousel
        ref={carRef}
        draggable={false}
        effect="fade"
        autoplay={isAutoPlay}
      >
        {imgArr}
      </Carousel>
    ),
    [isAutoPlay, imgArr]
  );

  // 控制走马灯的按钮
  const actions = useMemo(() => {
    const pauseHandler = () => setIsAutoPlay((prev) => !prev);
    const nextHandler = () => carRef.current?.next();
    const prevHandler = () => carRef.current?.prev();
    return [
      <VerticalRightOutlined onClick={prevHandler} />,
      isAutoPlay ? (
        <PauseOutlined onClick={pauseHandler} />
      ) : (
        <PlayCircleOutlined onClick={pauseHandler} />
      ),
      <VerticalLeftOutlined onClick={nextHandler} />,
    ];
  }, [isAutoPlay, carRef]);

  return (
    <Card cover={carousel} actions={actions} {...restProps}>
      <Card.Meta
        avatar={<Avatar src={avatar} />}
        title="Bing Wallpaper"
        description="Here are the Bing wallpapers of the week"
      />
    </Card>
  );
}
