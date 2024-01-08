// Antd Imports
import { Form, Button, message } from "antd";

// Form Imports
import { InputEmail } from "./input-email";
import { InputPasswd } from "./input-passwd";

// Query Imports
import { useLoginMutation } from "@/hooks/api-firebase";

export function FormLogin() {
  const [form] = Form.useForm<FormValues>();

  const mutation = useLoginMutation();

  const [toast] = message.useMessage();

  const handleSubmit = (data: FormValues) => {
    mutation.mutate(data, {
      onError(error) {
        toast.error(error.message);
      },
      onSuccess() {
        toast.success("Sign in successlly!");
      },
    });
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
        <InputEmail></InputEmail>
        <InputPasswd></InputPasswd>
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
  password: string;
}
