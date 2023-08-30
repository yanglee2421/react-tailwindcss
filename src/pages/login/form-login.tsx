// Antd Imports
import { Form, Button } from "antd";

// Form Imports
import { InputEmail } from "./input-email";
import { InputPasswd } from "./input-passwd";
import { InputRemember } from "./input-remember";

export function FormLogin(props: FormLoginProps) {
  // ** Props
  const { onSubmit } = props;

  const [form] = Form.useForm();

  return (
    <Form
      form={form}
      onFinish={onSubmit}
      requiredMark={false}
      layout="vertical"
      size="large"
    >
      <InputEmail />
      <InputPasswd />
      <InputRemember />
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
  );
}

export interface FormLoginProps {
  onSubmit(formValues: FormValues): void;
}

export interface FormValues {
  email: string;
  passwd: string;
}
