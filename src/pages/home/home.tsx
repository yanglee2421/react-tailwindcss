// React Imports
import React from "react";

// Antd Imports
import { Button } from "antd";

export function Home() {
  const [count, setCount] = React.useState(0);

  return (
    <>
      <Button onClick={() => setCount((p) => p + 1)}>{count}</Button>
    </>
  );
}
