// Antd Imports
import { Typography, Layout, Button, Divider } from "antd";

// Theme Imports
import { ThemeToggle } from "@/themes";

// Acl Imports
import { useAcl } from "@/configs/acl";

// Login Imports
import { useLogin } from "@/hooks";

// Components Imports
import { HomeCounter } from "./home-counter";
import { HomeCounter2 } from "./home-counter-2";

// React Imports
import { useMemo } from "react";

// Redux Imports
import { sliceDemo, useAppDispatch } from "@/redux";

export function Home() {
  // Redux Hooks
  const { usr } = useLogin();

  // Acl Hooks
  const acl = useAcl();

  // Login Hooks
  const { signOut } = useLogin();

  const homeEl = useMemo(() => {
    return (
      <>
        <HomeCounter />
        <br />
        <HomeCounter2 />
      </>
    );
  }, []);

  const dispatch = useAppDispatch();

  const handleAgeAdd = () => {
    const action = sliceDemo.actions.ageAdd();
    dispatch(action);
  };

  const handlePost = () => {
    globalThis.postMessage("hello", "http://127.0.0.1:5500");
  };

  return (
    <Layout className="h-full">
      <div>
        <ThemeToggle />
        <br />
        <Button onClick={signOut} type="primary" danger>
          Sign Out
        </Button>
        <br />
        <Button onClick={handlePost} type="primary">
          post
        </Button>
      </div>
      <Typography.Title className="bg-left-bottom bg-no-repeat bg-gradient-to-r from-sky-500 to-indigo-500 bg-[length:0_2px] hover:bg-[length:100%_2px] transition-all">
        home
      </Typography.Title>
      <Button onClick={handleAgeAdd}>+1</Button>
      <Divider>or</Divider>
      {homeEl}
      <Divider>or</Divider>
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
