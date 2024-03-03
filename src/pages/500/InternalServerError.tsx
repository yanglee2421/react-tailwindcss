import { Button, Result } from "antd";
import { Link } from "@tanstack/react-router";

export function InternalServerError() {
  return (
    <Result
      status="500"
      title="500"
      subTitle="Sorry, something went wrong."
      extra={
        <Link to="/">
          <Button type="primary" size="large">
            Take me home
          </Button>
        </Link>
      }
    ></Result>
  );
}
