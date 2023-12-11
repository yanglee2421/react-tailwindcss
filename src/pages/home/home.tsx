// Antd Imports
import { Button } from "antd";

// Hooks Imports
import { useLogin, useObserverResize } from "@/hooks";

// React Imports
import React from "react";

// Clsx Imports
import clsx from "clsx";

export function Home() {
  const login = useLogin();

  const containerRef = React.useRef<HTMLDivElement>(null);
  const entry = useObserverResize(containerRef);

  return (
    <>
      <div
        className={clsx([
          "h-full flex flex-col",
          "border border-solid border-red-100",
          "p-3",
        ])}
      >
        <div>
          <Button onClick={login.signOut} danger type="primary">
            logout
          </Button>
        </div>
        <div
          ref={containerRef}
          className={clsx([
            "flex-1 overflow-hidden",
            "mt-4",
            "border border-blue-500 border-solid",
          ])}
        >
          <iframe
            src="http://localhost:3000"
            width={entry?.contentBoxSize?.[0].inlineSize}
            height={entry?.contentBoxSize?.[0].blockSize}
            frameBorder={0}
          ></iframe>
        </div>
      </div>
    </>
  );
}
