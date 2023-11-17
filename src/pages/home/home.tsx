// React Imports
// import React from "react";

// Antd Imports
import { Button } from "antd";

// Hooks Imports
import { useLogin } from "@/hooks";

export function Home() {
  const login = useLogin();

  return (
    <>
      <div>
        <Button onClick={login.signOut} danger type="primary">
          logout
        </Button>
      </div>
    </>
  );
}
