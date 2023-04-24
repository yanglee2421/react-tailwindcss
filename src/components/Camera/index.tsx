import { useRef, useEffect } from "react";

export function Camera() {
  const videoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    handleCamera(video);
  }, []);

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
