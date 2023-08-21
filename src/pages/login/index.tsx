// API Imports
import { useDemoGet } from "@/hooks";
import { useQueryClient } from "@tanstack/react-query";

// Antd Imports
import { Button, Col, Row, Typography } from "antd";
import { useMemo, useState } from "react";

export function Component() {
  const queryClient = useQueryClient();

  const handleSetQueryData = () => {
    queryClient.setQueryData(["demo"], () => Date.now());
  };

  const handleInvalidate = () => {
    queryClient.invalidateQueries(["demo"]);
  };

  const [count, setCount] = useState(0);
  const memoEl = useMemo(() => {
    return <Child />;
  }, [count]);

  return (
    <>
      <Button onClick={() => setCount((prev) => prev + 1)}>+1</Button>
      <Button onClick={handleSetQueryData}>setQueryData</Button>
      <Button onClick={handleInvalidate}>invalidateQueries</Button>
      <hr />
      <Row>
        <Col xs={24} sm={12}>
          <Typography>No memo</Typography>
          <Child />
        </Col>
        <Col xs={24} sm={12}>
          <Typography>memo</Typography>
          {memoEl}
        </Col>
      </Row>
    </>
  );
}

function Child() {
  const { data } = useDemoGet();

  return <>{data}</>;
}
