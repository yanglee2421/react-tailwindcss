import { Button, Result } from "antd";
import { Link } from "@tanstack/react-router";

export function NotFound() {
  return (
    <Result
      status="404"
      title="404"
      subTitle="Not Found"
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
