// Styles Imports
import styles from "./home.module.scss";
import clsx from "clsx";

// Redux Imports
import { useAppDispatch, sliceLogin, useAppSelector } from "@/redux";

// Antd Imports
import { Typography, Layout, Button } from "antd";

// Theme Imports
import { ThemeToggle } from "@/themes";

import { useAcl } from "@/configs/acl";

export const Home = () => {
  const dispatch = useAppDispatch();
  const usr = useAppSelector((s) => s.login.usr);

  const handleSignOut = () => {
    const action = sliceLogin.actions.islogged(false);
    dispatch(action);
  };

  const ability = useAcl();

  return (
    <Layout className={clsx(styles.home)}>
      <div>
        <ThemeToggle />
        <Button onClick={handleSignOut} type="primary" danger>
          Sign Out
        </Button>
      </div>
      <Typography.Title>home</Typography.Title>
      <Typography.Text>{usr?.role}</Typography.Text>
      {ability.can("update", "Article") && "Has permissions"}
    </Layout>
  );
};
