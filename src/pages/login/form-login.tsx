// Antd Imports
import { Form, Button } from "antd";

// Form Imports
import { InputEmail } from "./input-email";
import { InputPasswd } from "./input-passwd";
import { InputRemember } from "./input-remember";

// API Imports
import { useUsrPost, useLogin } from "@/hooks";

export function FormLogin(props: FormLoginProps) {
  // ** Props
  const {} = props;

  // Login Hooks
  const { signIn } = useLogin();

  // Form Hooks
  const [form] = Form.useForm();

  // API Hooks
  const { mutateAsync, isLoading } = useUsrPost();

  // Form Submit
  const handleSubmit = async (data: FormValues) => {
    const usr = await mutateAsync({ data });
    signIn(usr);
  };

  return (
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
          loading={isLoading}
          htmlType="submit"
          type="primary"
          block
          className="uppercase font-medium"
        >
          Sign In As Admin
        </Button>
      </Form.Item>
    </Form>
  );
}

export interface FormLoginProps {}

export interface FormValues {
  email: string;
  passwd: string;
}
