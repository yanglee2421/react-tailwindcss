// React Imports
import React from "react";

// Antd Imports
import { Button } from "antd";

// WebSocket
import { NeoWs } from "./neo-ws";

// Hooks Imports
import { useLogin } from "@/hooks";

export function WebSocketPage() {
  const wsRef = React.useRef(
    new NeoWs({
      url: "ws://localhost:3001",
      refetchInterval: 1000 * 10,
    })
  );

  const [msg, setMsg] = React.useState<string[]>([]);
  const listEl = React.useMemo(() => {
    return msg.map((item) => {
      return (
        <li key={item} className="mb-3 last:mb-0">
          {item}
        </li>
      );
    });
  }, [msg]);

  const handleMsg = () => {
    const ws = wsRef.current;
    ws.send(crypto.randomUUID());
  };
  const handleClose = () => {
    const ws = wsRef.current;
    ws.close();
  };

  React.useEffect(() => {
    const ws = wsRef.current;
    ws.connect();
    ws.onMessage((evt) => {
      console.log("message");
      setMsg((prev) => [...prev, evt.data]);
    });
    ws.onMessage(() => {
      console.log("message2");
    });
    ws.onClose((evt) => {
      console.log(evt);
    });

    return () => {
      ws.close();
    };
  }, [wsRef]);

  const { signOut } = useLogin();
  const handleLogout = () => {
    signOut();
    console.log(wsRef.current);
  };

  return (
    <>
      <div className="p-2 flex gap-2">
        <Button onClick={handleMsg}>message</Button>
        <Button onClick={handleClose} danger>
          close
        </Button>
        <Button
          onClick={() => {
            console.log(wsRef.current);
          }}
        >
          log
        </Button>
        <Button onClick={handleLogout}>logout</Button>
      </div>
      <ul>{listEl}</ul>
    </>
  );
}
