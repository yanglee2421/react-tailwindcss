import { styled } from "@mui/system";
import { Form, Button, message } from "antd";
import { useLoginMutation } from "@/hooks/api-firebase/useLoginMutation";
import { InputEmail } from "./input-email";
import { InputPasswd } from "./input-passwd";

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
          <StyledButton
            htmlType="submit"
            loading={mutation.isPending}
            type="primary"
            block
          >
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
