// Styles Imports
import styles from "./home.module.scss";
import clsx from "clsx";

// Redux Imports
import { useAppSelector } from "@/redux";

// Antd Imports
import { Typography, Layout, Button } from "antd";

// Theme Imports
import { ThemeToggle } from "@/themes";

// Acl Imports
import { useAcl } from "@/configs/acl";

// Login Imports
import { useLogin } from "@/hooks";

export const Home = () => {
  // Redux Hooks
  const usr = useAppSelector((s) => s.login.usr);
  console.log(usr);

  // Acl Hooks
  const acl = useAcl();

  // Login Hooks
  const { signOut } = useLogin();

  return (
    <Layout className={clsx(styles.home)}>
      <div>
        <ThemeToggle />
        <Button onClick={signOut} type="primary" danger>
          Sign Out
        </Button>
      </div>
      <Typography.Title>home</Typography.Title>
      <Typography.Text>{usr?.role}</Typography.Text>
      {acl.can("create", "Article") && (
        <Typography.Text>You have persisi</Typography.Text>
      )}
    </Layout>
  );
};
