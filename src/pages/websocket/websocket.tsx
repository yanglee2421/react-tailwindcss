// React Imports
import React, { useEffect, useRef } from "react";

// Antd Imports
import { Button } from "antd";

export function WebSocketPage() {
  const wsRef = useRef<WebSocket>();

  const [msg, setMsg] = React.useState("");

  useEffect(() => {
    wsRef.current = new WebSocket("ws://localhost:3001");
    const socket = wsRef.current;

    const controller = new AbortController();
    const { signal } = controller;

    socket.addEventListener(
      "message",
      (evt) => {
        console.log(evt);
        setMsg(evt.data);
      },
      { signal }
    );

    return () => {
      socket.close();
      controller.abort();
    };
  }, [wsRef]);

  const handleMsg = () => {
    const socket = wsRef.current;
    if (!socket) return;
    socket.send(crypto.randomUUID());
  };

  return (
    <>
      <Button onClick={handleMsg}>message</Button>
      <p>{msg}</p>
    </>
  );
}
