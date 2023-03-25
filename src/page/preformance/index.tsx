import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { globalMod } from "@/util";
import style from "./style.module.scss";
import { useStyle } from "@/hook";
import { Tag, Input, Select } from "antd";
import { PlusOutlined } from "@ant-design/icons";

export default function Page() {
  const [count, setCount] = useState(0);

  const [state, setState] = useState({});
  const ref = useRef({});
  const mem = useMemo(() => ({}), []);
  const cfx = useCallback(() => {}, [count]);
  globalMod.target ??= setState;
  console.log(globalMod.target === setState);

  /*   useEffect(() => {
    if (globalMod.target === null) {
      globalMod.target = ref;
    }
    console.log(globalMod.target === ref);
  }, [count]); */

  return (
    <>
      <button onClick={(e) => setCount((prev) => prev + 1)}>+1</button>
      <Layout></Layout>
    </>
  );
}

function Component() {
  const cx = useStyle(style);
  console.log("render");

  return (
    <div className={cx("outer")}>
      <div className={cx("inner")}></div>
    </div>
  );
}

function Title(props: React.PropsWithChildren) {
  const { children } = props;

  const cx = useStyle(style);

  return (
    <div>
      <span className={cx("title-h1")}>{children}</span>
    </div>
  );
}

function Layout() {
  const cx = useStyle(style);

  return (
    <div>
      <Title>Grid</Title>
      <div className={cx("grid-1")}>
        <div>{/* <Tags></Tags> */}</div>
        <div>{/* <Languages /> */}</div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <Title>Flex</Title>
      <div className={cx("flex-box")}>
        <div>{/* <Camera /> */}</div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <Title>Grid Case 2</Title>
      <div className={cx("grid-box")}>
        <div>
          <Component />
        </div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
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
