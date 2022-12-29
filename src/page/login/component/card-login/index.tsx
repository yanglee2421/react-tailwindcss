import { useClass } from "@/hook";
import style from "./card-login.module.scss";
import { Button, Card, Form, Input, Checkbox, message } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { loginFn } from "@/redux/slice/auth";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "@/api/rtkq/authApi";
import React from "react";

const cn = useClass(style);
namespace type {
  export interface formValue {
    password: string;
    username: string;
    remember: boolean;
  }
  export interface props {
    isRegister: boolean;
    onRegisterClick(e: React.MouseEvent): void;
  }
}
export default (props: type.props) => {
  const { isRegister, onRegisterClick } = props;
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login, loginRes] = useLoginMutation();

  // 表单提交
  const onFinish = (value: type.formValue) => {
    login(value).then((res: any) => {
      if (!res.data) return;
      const { isPass, token, username, invalidTime, mes } = res.data;
      const auth = { username, invalidTime, token, remember: value.remember };
      if (isPass) {
        dispatch(loginFn(auth));
        navigate("/web3d", { replace: true });
        return;
      }
      message.warning(mes);
    });
  };
  return (
    <Card className={cn(["card-login", isRegister ? "rotate-y-180" : ""])}>
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
            placeholder="手机号"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your Password!" }]}
        >
          <Input
            prefix={<LockOutlined className={cn("site-form-item-icon")} />}
            type="password"
            placeholder="密码"
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
          Or{" "}
          <a
            onClick={(e) => onRegisterClick(e)}
            href="#"
          >
            register now!
          </a>
        </Form.Item>
      </Form>
    </Card>
  );
};
