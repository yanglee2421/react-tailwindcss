import style from "../style.module.scss";
import { Button, Card, Checkbox, Form, Input, message } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "@/api/api-rtkq";
import { useClass } from "@/hook";
import { CtxAuth } from "@/route";
import { preventDefault } from "@/util";
import React, { useCallback, useContext } from "react";

const cn = useClass(style);

namespace Type {
  export interface formValue {
    password: string;
    username: string;
    remember: boolean;
  }
  export interface props {
    isRegister: boolean;
    onRegisterClick(): void;
  }
}

export function CardLogin(props: Type.props) {
  const { isRegister, onRegisterClick } = props;
  const clickHandler = useCallback(preventDefault(onRegisterClick), []);
  const navigate = useNavigate();
  const [loginFn] = useLoginMutation();
  // 表单提交
  const [form] = Form.useForm();
  const { signIn } = useContext(CtxAuth);
  const onFinish = useCallback(async (value: Type.formValue) => {
    try {
      const res = await loginFn(value).unwrap();
      const { isOk, token, username, invalidTime, mes } = res;
      if (isOk) {
        signIn({ user: username, token, invalidTime }, value.remember);
        navigate("/", { replace: true });
        return;
      }
      message.warning(mes);
    } catch (err) {
      console.error(err);
    }
  }, []);

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
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>
          <a
            className={cn("login-form-forgot")}
            href="xxx"
            onClick={preventDefault()}
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
            Login
          </Button>
          Or{" "}
          <a onClick={clickHandler} href="xxx">
            register now!
          </a>
        </Form.Item>
      </Form>
    </Card>
  );
}
