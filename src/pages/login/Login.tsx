import {
  GithubOutlined,
  GoogleOutlined,
  FacebookOutlined,
  TwitterOutlined,
  UserOutlined,
  LockOutlined,
} from "@ant-design/icons";
import { Box, styled } from "@mui/system";
import {
  Button,
  Divider,
  Typography,
  Form,
  Input,
  message,
  Layout,
} from "antd";
import justHer from "@/assets/image/bg/justHer.jpg";
import { useLoginMutation } from "@/hooks/api-firebase/useLoginMutation";

export function Login() {
  const [toast, contextHolder] = message.useMessage();
  const [form] = Form.useForm<{
    email: string;
    password: string;
  }>();

  const mutation = useLoginMutation();

  return (
    <StyledLayout>
      {contextHolder}
      <Box display={"flex"} sx={{ blockSize: "100%" }}>
        <Box
          sx={{
            position: "relative",
            flex: 1,
            overflow: "hidden",
            backgroundAttachment: "fixed",
            backgroundSize: "cover",
            backgroundImage: `url(${new URL(justHer, import.meta.url).href})`,
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: 6,
              left: 9,
              display: "flex",
              alignItems: "center",
              gap: 3,
            }}
          >
            <Typography.Title level={2}>Yang_Lee</Typography.Title>
          </Box>
        </Box>
        <Box
          sx={(theme) => {
            return {
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              paddingInline: 6,
              width: "100%",
              maxWidth: {
                md: theme.spacing(28 * 4),
              },
            };
          }}
        >
          <Typography.Title level={2}>Wellcome to here!</Typography.Title>
          <Typography.Paragraph>
            Please sign-in to your account and start the adventure.
          </Typography.Paragraph>
          <Form
            form={form}
            onFinish={(data) => {
              mutation.mutate(data, {
                onError(error) {
                  toast.error(error.message);
                },
                onSuccess() {
                  toast.success("Sign in successlly!");
                },
              });
            }}
            requiredMark={false}
            layout="vertical"
            size="large"
          >
            <Form.Item
              name={"email"}
              rules={[
                { required: true, message: "Email is requred!" },
                { type: "email", message: "Must be an email!" },
              ]}
            >
              <Input
                prefix={<UserOutlined className="text-gray-400" />}
                type="email"
                placeholder="Email"
              />
            </Form.Item>
            <Form.Item
              name={"password"}
              rules={[
                { required: true, message: "Password is required!" },
                { type: "string", min: 5, max: 16, message: "8-16" },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Password"
              />
            </Form.Item>
            <Box>
              <Typography.Link underline>Forgot password?</Typography.Link>
            </Box>
            <StyledButton
              htmlType="submit"
              loading={mutation.isPending}
              type="primary"
              block
            >
              Sign In
            </StyledButton>
          </Form>
          <Box display={"flex"} justifyContent={"space-between"} pt={6}>
            <Typography.Text>New on our platform?</Typography.Text>
            <Typography.Link underline>Create an account</Typography.Link>
          </Box>
          <Divider>Or</Divider>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: 3,
            }}
          >
            <Button shape="circle" size="large" icon={<FacebookOutlined />} />
            <Button
              shape="circle"
              size="large"
              icon={<TwitterOutlined className="text-blue-500" />}
            />
            <Button shape="circle" size="large" icon={<GithubOutlined />} />
            <Button shape="circle" size="large" icon={<GoogleOutlined />} />
          </Box>
        </Box>
      </Box>
    </StyledLayout>
  );
}
const StyledButton = styled(Button)({
  textTransform: "uppercase",
});

const StyledLayout = styled(Layout)({
  position: "fixed",
  inset: 0,
});
