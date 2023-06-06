import { Button, Result } from "antd";
import { NavLink } from "react-router-dom";

export function Component() {
  const extra = <HomeLink></HomeLink>;
  return <Result status="404" title="404" subTitle="Not Found" extra={extra} />;
}

function HomeLink() {
  return (
    <NavLink to="/">
      <Button type="primary" size="large">
        Take me home
      </Button>
    </NavLink>
  );
}
