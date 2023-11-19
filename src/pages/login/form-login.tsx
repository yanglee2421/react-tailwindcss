// Antd Imports
import { Form, Button } from "antd";

// Form Imports
import { InputEmail } from "./input-email";
import { InputPasswd } from "./input-passwd";
import { InputRemember } from "./input-remember";

// API Imports
import { useUsrPost, useLogin } from "@/hooks";

// React Imports
import React from "react";

export function FormLogin() {
  // Login Hooks
  const { signIn } = useLogin();

  // Form Hooks
  const [form] = Form.useForm();

  // API Hooks
  const loginMutation = useUsrPost();

  // Form Submit
  const handleSubmit = async (data: FormValues) => {
    loginMutation.mutate(
      { data },
      {
        onSuccess(usr) {
          React.startTransition(() => {
            signIn(usr, data.remember);
          });
        },
      }
    );
  };

  return (
    <>
      <Form
        form={form}
        onFinish={handleSubmit}
        requiredMark={false}
        layout="vertical"
        size="large"
      >
        <InputEmail />
        <InputPasswd />
        <InputRemember />
        <Form.Item>
          <Button
            loading={loginMutation.isPending}
            htmlType="submit"
            type="primary"
            block
            className="uppercase font-medium"
          >
            Sign In As Admin
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}

export interface FormValues {
  email: string;
  passwd: string;
  remember: boolean;
}
