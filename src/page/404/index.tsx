import style from "./404.module.scss";
import { NavLink } from "react-router-dom";
import { Button, Card, Divider } from "antd";
import { useStyle } from "@/hook";
import React from "react";

/**
 * 404 页面
 * @returns JSX
 */
export default function Page404() {
  const cx = useStyle(style);
  return (
    <div className={cx("box")}>
      <div>
        <Card className={cx("box-card")}>
          <p className={cx("p-404")}>404</p>
          <p className={cx("p-ntf")}>Page not found</p>
          <Divider />
          <p className={cx("p-des")}>
            But if you don't change your direction, and if you keep looking, you
            may end up where you are heading.
          </p>
        </Card>
        <Card className={cx("box-card mt-2")}>
          <NavLink to="/">
            <Button type="primary" danger>
              Take me home
            </Button>
          </NavLink>
        </Card>
      </div>
    </div>
  );
}
