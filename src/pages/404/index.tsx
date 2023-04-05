import { Button, Result } from "antd";
import { NavLink } from "react-router-dom";

/**
 * 404 页面
 * @returns JSX
 */
export default function Page404() {
  const extra = (
    <NavLink to="/">
      <Button type="primary" size="large">
        Take me home
      </Button>
    </NavLink>
  );
  return <Result status="404" title="404" subTitle="Not Found" extra={extra} />;
}
