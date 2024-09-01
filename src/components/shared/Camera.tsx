import React from "react";

export function Camera(
  props: React.DetailedHTMLProps<
    React.VideoHTMLAttributes<HTMLVideoElement>,
    HTMLVideoElement
  >,
) {
  const videoRef = React.useRef<HTMLVideoElement>(null);

  React.useEffect(() => {
    const video = videoRef.current;

    if (!(video instanceof HTMLVideoElement)) {
      return;
    }

    handleCamera(video);
  }, []);

  return <video ref={videoRef} {...props}></video>;
}

async function handleCamera(video: HTMLVideoElement) {
  const mediaStream = await navigator.mediaDevices.getUserMedia({
    video: {
      width: video.width,
      height: video.height,
    },
    audio: {},
  });
  video.srcObject = mediaStream;
  video.onloadedmetadata = () => video.play();
}
