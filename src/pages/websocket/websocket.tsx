// React Imports
import React, { useCallback, useEffect, useRef, useState } from "react";

// Antd Imports
import { Button } from "antd";

export function WebSocketPage() {
  const wsRef = useRef<WebSocket>();
  const controllerRef = useRef(new AbortController());

  const [msg, setMsg] = React.useState("");
  const [isLoading, setIsLoading] = useState(true);

  const handleConnect = useCallback(() => {
    wsRef.current = new WebSocket("ws://localhost:3001");

    const { signal } = controllerRef.current;
    const socket = wsRef.current;

    socket.addEventListener(
      "open",
      (evt) => {
        console.log("ws stand by", evt);
        setIsLoading(false);
      },
      { signal }
    );

    socket.addEventListener(
      "message",
      (evt) => {
        console.log(evt);
        setMsg(evt.data);
      },
      { signal }
    );

    socket.addEventListener(
      "close",
      (evt) => {
        console.log(evt.code);
        if (evt.code === 1000) return;

        setIsLoading(true);

        setTimeout(handleConnect, 1000 * 2);
      },
      { signal }
    );
  }, [wsRef, controllerRef, setIsLoading, setMsg]);

  useEffect(() => {
    handleConnect();

    return () => {
      controllerRef.current.abort();

      const socket = wsRef.current;
      if (!socket) return;
      if (socket.readyState === socket.OPEN) {
        socket.close(1000);
      }
    };
  }, [wsRef, setMsg, setIsLoading, controllerRef]);

  const handleMsg = () => {
    const socket = wsRef.current;
    if (!socket) return;
    socket.send(crypto.randomUUID());
  };
  const handleClose = () => {
    const socket = wsRef.current;
    if (!socket) return;
    socket.close(1000);
  };

  return (
    <>
      {isLoading && <p>loading...</p>}
      {!isLoading && (
        <>
          <Button onClick={handleMsg}>message</Button>
          <Button onClick={handleClose} danger>
            close
          </Button>
          <p>{msg}</p>
        </>
      )}
    </>
  );
}
