// Antd Imports
import { Typography, Layout, Button } from "antd";

// Theme Imports
import { ThemeToggle } from "@/themes";

// Acl Imports
import { useAcl } from "@/configs/acl";

// Login Imports
import { useLogin } from "@/hooks";

export function Home() {
  // Redux Hooks
  const { usr } = useLogin();

  // Acl Hooks
  const acl = useAcl();

  // Login Hooks
  const { signOut } = useLogin();

  return (
    <Layout className="h-full">
      <div>
        <ThemeToggle />
        <Button onClick={signOut} type="primary" danger>
          Sign Out
        </Button>
      </div>
      <Typography.Title className="bg-left-bottom bg-no-repeat bg-gradient-to-r from-sky-500 to-indigo-500 bg-[length:0_2px] hover:bg-[length:100%_2px] transition-all">
        home
      </Typography.Title>
      <p>{usr?.email}</p>
      <p>{usr?.role}</p>
      <p>{usr?.loginAt}</p>
      <Typography.Text>{usr?.role}</Typography.Text>
      {acl.can("create", "Article") && (
        <Typography.Text>You are admin</Typography.Text>
      )}
    </Layout>
  );
}
