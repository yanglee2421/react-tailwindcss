import style from "./login.module.scss";
import { Button, Card, Checkbox, Form, Input } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { useClass } from "@/hook";
import { useDispatch } from "react-redux";
const cn = useClass(style);
namespace type {
  export interface formValue {
    password: string;
    username: string;
    remember: boolean;
  }
}
export default () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const onFinish = (value: type.formValue) => {
    if (value.remember) {
      localStorage.setItem("auth", JSON.stringify(value));
    }
    console.log(value);
  };
  return (
    <div className="h-100 flex center-center">
      <Card className={cn("card-login")}>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: "Please input your Username!" }]}
          >
            <Input
              prefix={<UserOutlined className={cn("site-form-item-icon")} />}
              placeholder="Username"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input
              prefix={<LockOutlined className={cn("site-form-item-icon")} />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Form.Item
              name="remember"
              valuePropName="checked"
              noStyle
            >
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <a
              className={cn("login-form-forgot")}
              href="#"
            >
              Forgot password
            </a>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className={cn("login-form-button")}
            >
              Log in
            </Button>
            Or <a href="#">register now!</a>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};
