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

export function FormLogin(props: FormLoginProps) {
  // ** Props
  // const {} = props;
  void props;

  // Login Hooks
  const { signIn } = useLogin();

  // Form Hooks
  const [form] = Form.useForm();

  // API Hooks
  const loginMutation = useUsrPost();

  const iframeReactMuiRef = React.useRef<HTMLIFrameElement>(null);
  const iframeVueEleRef = React.useRef<HTMLIFrameElement>(null);

  // Form Submit
  const handleSubmit = async (data: FormValues) => {
    loginMutation.mutate(
      { data },
      {
        onSuccess(usr) {
          iframeReactMuiRef.current?.contentWindow?.postMessage(
            JSON.stringify({
              type: "sso-login",
              rememberMe: data.remember,
              ...usr,
            }),
            import.meta.env.VITE_REACT_ANTD_URL,
            []
          );

          iframeVueEleRef.current?.contentWindow?.postMessage(
            JSON.stringify({
              type: "sso-login",
              rememberMe: data.remember,
              ...usr,
            }),
            import.meta.env.VITE_VUE_ELE_URL,
            []
          );

          setTimeout(() => {
            React.startTransition(() => {
              signIn(usr, data.remember);
            });
          }, 0);
        },
      }
    );
  };

  return (
    <>
      <iframe
        ref={iframeReactMuiRef}
        src={import.meta.env.VITE_REACT_MUI_URL}
        style={{ display: "none" }}
      ></iframe>
      <iframe
        ref={iframeVueEleRef}
        src={import.meta.env.VITE_VUE_ELE_URL}
        style={{ display: "none" }}
      ></iframe>
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

export interface FormLoginProps {}

export interface FormValues {
  email: string;
  passwd: string;
  remember: boolean;
}
