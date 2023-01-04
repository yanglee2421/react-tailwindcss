import { useClass } from "@/hook";
import style from "./card-login.module.scss";
import { Button, Card, Checkbox, Form, Input, message } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/redux";
import { loginAct } from "@/redux/slice-auth";
import { useLoginMutation } from "@/api/rtkq/api-auth";
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
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [loginFn] = useLoginMutation();

  // 表单提交
  const [form] = Form.useForm();
  const onFinish = (value: type.formValue) => {
    loginFn(value)
      .unwrap()
      .then((data) => {
        const { isOk, token, username, invalidTime, mes } = data;
        const auth = {
          username,
          invalidTime,
          token,
          remember: value.remember,
          isLogined: true,
        };
        if (isOk) {
          dispatch(loginAct(auth));
          navigate("/", { replace: true });
          return;
        }
        message.warning(mes);
      })
      .catch((err) => {
        console.error(err);
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
