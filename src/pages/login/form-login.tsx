// Antd Imports
import { Form, Button } from "antd";

// Form Imports
import { InputEmail } from "./input-email";
import { InputPasswd } from "./input-passwd";

export function FormLogin() {
  // Form Hooks
  const [form] = Form.useForm<{
    email: string;
  }>();

  return (
    <>
      <Form
        form={form}
        onFinish={(data) => {
          console.log(data);
        }}
        requiredMark={false}
        layout="vertical"
        size="large"
      >
        <InputEmail />
        <InputPasswd />
        <Form.Item>
          <Button
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
