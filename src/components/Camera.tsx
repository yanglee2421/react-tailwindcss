// React Imports
import React from "react";

export function Camera() {
  const videoRef = React.useRef<HTMLVideoElement>(null);
  React.useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    handleCamera(video);
  }, [videoRef]);

  return (
    <div>
      <video ref={videoRef} width={300} height={200}></video>
    </div>
  );
}

async function handleCamera(video: HTMLVideoElement) {
  const mediaStream = await navigator.mediaDevices.getUserMedia({
    video: {
      width: 300,
      height: 200,
    },
    audio: {},
  });
  video.srcObject = mediaStream;
  video.onloadedmetadata = () => video.play();
}
