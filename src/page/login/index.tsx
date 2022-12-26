import style from "./login.module.scss";
import { useClass } from "@/hook";
import { Button, Card, Checkbox, Form, Input, message } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { useLoginMutation } from "@/api/rtkq/authApi";
import { useDispatch } from "react-redux";
import { loginFn } from "@/redux/slice/auth";
import { useNavigate } from "react-router-dom";
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
  const [login, loginRes] = useLoginMutation();
  const navigate = useNavigate();
  // 表单提交
  const onFinish = (value: type.formValue) => {
    login(value).then((res: any) => {
      if (!res.data) return;
      const { isPass, token, username, invalidTime, mes } = res.data;
      const auth = { username, invalidTime };
      if (isPass) {
        dispatch(loginFn(auth));
        localStorage.setItem("token", token);
        value.remember && localStorage.setItem("auth", JSON.stringify(auth));
        navigate("/web3d", { replace: true });
        return;
      }
      message.warning(mes);
    });
  };
  return (
    <div className="h-100 flex center-center">
      <Card className={cn("card-login")}>
        <Form
          form={form}
          name="normal_login"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          className="login-form"
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
