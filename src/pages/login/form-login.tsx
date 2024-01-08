// Antd Imports
import { Form, Button, message } from "antd";

// Form Imports
import { InputEmail } from "./input-email";
import { InputPasswd } from "./input-passwd";

// Query Imports
import { useLoginMutation } from "@/hooks/api-firebase";

// MUI Imports
import { styled } from "@mui/system";

export function FormLogin() {
  const [form] = Form.useForm<FormValues>();

  const mutation = useLoginMutation();

  const [toast, contextHolder] = message.useMessage();

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
      {contextHolder}
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
          <StyledButton htmlType="submit" type="primary" block>
            Sign In
          </StyledButton>
        </Form.Item>
      </Form>
    </>
  );
}

export interface FormValues {
  email: string;
  password: string;
}

const StyledButton = styled(Button)({
  textTransform: "uppercase",
});
