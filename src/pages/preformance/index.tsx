import style from "./style.module.scss";
import { useStyle } from "@/hooks";
import { Button, Card, Drawer, List, Modal } from "antd";
import React, { useRef, useEffect, useState } from "react";

export default function MyEdit() {
  const cx = useStyle(style);
  const [showDlg, setShowDlg] = useState(false);
  const [showDrw, setShowDrw] = useState(false);
  return (
    <>
      <Modal
        open={showDlg}
        onCancel={() => setShowDlg(false)}
        title="Comparison"
      >
        <div className={cx("box")}>
          <Card title="Exist">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere at
            amet vitae unde. Tempore quae rem ipsum cupiditate dolorum culpa?
            Harum doloribus recusandae nesciunt, laudantium quae iste ipsum
            quibusdam. Saepe?
          </Card>
          <Card title="New"></Card>
        </div>
      </Modal>
      <Drawer
        open={showDrw}
        onClose={() => setShowDrw(false)}
        placement="top"
        height="100%"
        title="Detail"
        extra={
          <>
            <Button>Edit</Button>
            <Button>Create new product</Button>
            <Button onClick={() => setShowDlg(true)}>
              Save current product
            </Button>
          </>
        }
      ></Drawer>
      <div className={cx("box b-red")}>
        <Card title="Form"></Card>
        <Card title="History">
          <List>
            <List.Item onClick={() => setShowDrw(true)}>label1</List.Item>
            <List.Item>label1</List.Item>
            <List.Item>label1</List.Item>
            <List.Item>label1</List.Item>
            <List.Item>label1</List.Item>
            <List.Item>label1</List.Item>
            <List.Item>label1</List.Item>
          </List>
        </Card>
      </div>
    </>
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
