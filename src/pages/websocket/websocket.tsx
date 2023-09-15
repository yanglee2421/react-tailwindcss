// React Imports
import React, { useCallback, useEffect, useRef, useState } from "react";

// Antd Imports
import { Button } from "antd";

export function WebSocketPage() {
  const wsRef = useRef<WebSocket>();
  const controllerRef = useRef(new AbortController());

  const [msg, setMsg] = React.useState("");
  const [isLoading, setIsLoading] = useState(true);

  const handleConnect = useCallback(() => {}, [
    wsRef,
    controllerRef,
    setIsLoading,
    setMsg,
  ]);

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

function toSocket(params: ToSocketParams) {
  // ** Params
  const { url, signal, onOpen, onMessage, onClose } = params;

  const socket = new WebSocket(url);
  socket.addEventListener("open", onOpen, { signal });
  socket.addEventListener("message", onMessage, { signal });
  socket.addEventListener("close", onClose, { signal });
}

interface ToSocketParams {
  url: string;
  signal: AbortSignal;
  onOpen(evt: Event): void;
  onMessage(evt: MessageEvent): void;
  onClose(evt: CloseEvent): void;
}
