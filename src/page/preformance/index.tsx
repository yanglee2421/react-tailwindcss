import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { globalMod } from "@/util";
import style from "./style.module.scss";
import { useClass } from "@/hook";
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
  const cx = useClass(style);
  console.log("render");

  return (
    <div className={cx("outer")}>
      <div className={cx("inner")}></div>
    </div>
  );
}

function Title(props: React.PropsWithChildren) {
  const { children } = props;

  const cx = useClass(style);

  return (
    <div>
      <span className={cx("title-h1")}>{children}</span>
    </div>
  );
}

function Layout() {
  const cx = useClass(style);

  return (
    <div>
      <Title>Grid</Title>
      <div className={cx("grid-1")}>
        <div>
          <Tags></Tags>
        </div>
        <div>
          <Languages />
        </div>
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

function Tags() {
  const cx = useClass(style);

  const [arr, setArr] = useState<string[]>(["001", "002"]);
  const tags = useMemo(() => {
    return arr.map((item) => <Tag key={item}>{item}</Tag>);
  }, [arr]);

  const [showInput, setShowInput] = useState(false);
  const [input, setInput] = useState("");
  const inputElement = useMemo(() => {
    if (!showInput)
      return (
        <Tag onClick={() => setShowInput(true)} className={cx("tag-dash")}>
          <PlusOutlined />
          New Tag
        </Tag>
      );
    return (
      <Input
        value={input}
        onChange={(e) => setInput(e.target.value.trim())}
        onPressEnter={(e) => {
          setArr((prev) => {
            if (prev.includes(input)) return prev;
            return [...prev, input];
          });
          setInput("");
          setShowInput(false);
        }}
        onBlur={() => {
          setInput("");
          setShowInput(false);
        }}
        autoFocus
        size="small"
      />
    );
  }, [showInput, input]);

  return (
    <div className="flex">
      {tags}
      {inputElement}
    </div>
  );
}

function Languages() {
  return (
    <Select
      mode="multiple"
      allowClear
      placeholder="Search by languages"
      options={languages()}
      className="w-100"
    />
  );
}

function languages() {
  return [
    { label: "Chinese (Simplified)", value: "Chinese (Simplified)" },
    { label: "Chinese (Traditional)", value: "Chinese (Traditional)" },
    { label: "Czech", value: "Czech" },
    { label: "Danish", value: "Danish" },
    { label: "Dutch", value: "Dutch" },
    { label: "English(US)", value: "English(US)" },
    { label: "English(UK)", value: "English(UK)" },
    { label: "English(AU)", value: "English(AU)" },
    { label: "English(CA)", value: "English(CA)" },
    { label: "Finnish", value: "Finnish" },
    { label: "French", value: "French" },
    { label: "German", value: "German" },
    { label: "Italian", value: "Italian" },
    { label: "Japanese", value: "Japanese" },
    { label: "Korean", value: "Korean" },
    { label: "Norwegian", value: "Norwegian" },
    { label: "Polish", value: "Polish" },
    { label: "Norwegian", value: "Norwegian" },
    { label: "Portuguese(Brazil)", value: "Portuguese(Brazil)" },
    { label: "Portuguese(Portugal)", value: "Portuguese(Portugal)" },
    { label: "Spanish", value: "Spanish" },
    { label: "Swedish", value: "Swedish" },
    { label: "Thai", value: "Thai" },
    { label: "Turkish", value: "Turkish" },
    { label: "Vietnamese", value: "Vietnamese" },
  ];
}
