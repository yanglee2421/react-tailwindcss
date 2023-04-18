import style from "./style.module.scss";
import { useStyle } from "@/hooks";
import { Card } from "antd";
import React, { useRef, useEffect, useState } from "react";

export default function MyEdit() {
  const cx = useStyle(style);
  const [html, setHtml] = useState("");
  return (
    <div className={cx("box b-red")}>
      <Card></Card>
      <Card></Card>
    </div>
  );
}

function Camera() {
  const videoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    (async () => {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: 300,
          height: 200,
        },
        audio: {},
      });
      video.srcObject = mediaStream;
      video.onloadedmetadata = () => video.play();
    })();
  }, []);

  return (
    <div>
      <video ref={videoRef} width={300} height={200}></video>
    </div>
  );
}
