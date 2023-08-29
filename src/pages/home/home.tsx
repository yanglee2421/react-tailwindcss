// Styles Imports
import styles from "./home.module.scss";
import clsx from "clsx";

// Redux Imports
import { useAppDispatch, sliceLogin } from "@/redux";

// Antd Imports
import { Typography, Layout, Button } from "antd";

// Theme Imports
import { ThemeToggle } from "@/themes";

export const Home = () => {
  const dispatch = useAppDispatch();
  const handleSignOut = () => {
    const action = sliceLogin.actions.islogged(false);
    dispatch(action);
  };

  console.log(styles);

  return (
    <Layout className={clsx(styles.home)}>
      <div>
        <ThemeToggle />
        <Button onClick={handleSignOut} type="primary" danger>
          Sign Out
        </Button>
      </div>
      <Typography>home</Typography>
    </Layout>
  );
};
