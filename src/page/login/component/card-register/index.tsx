import { Button, Card, Form, Input } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import style from "./card-register.module.scss";
import { useClass } from "@/hook";
import React from "react";
const cn = useClass(style);
namespace type {
  export interface props {
    isRegister: boolean;
    onLoginClick(e: React.MouseEvent): void;
  }
}
export default (props: type.props) => {
  const { isRegister, onLoginClick } = props;
  return (
    <Card className={cn(["card-register", isRegister ? "rotate-y-0" : ""])}>
      <Form>
        <Form.Item
          name="username"
          rules={[{ required: true }]}
        >
          <Input
            prefix={<UserOutlined className={cn("site-form-item-icon")} />}
            placeholder="手机号"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true }]}
        >
          <Input
            prefix={<LockOutlined className={cn("site-form-item-icon")} />}
            type="password"
            placeholder="密码"
          />
        </Form.Item>
        <Form.Item
          name="password2"
          rules={[{ required: true }]}
        >
          <Input
            prefix={<LockOutlined className={cn("site-form-item-icon")} />}
            type="password"
            placeholder="确认密码"
          />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className={cn("login-form-button")}
          >
            Register
          </Button>
          Or{" "}
          <a
            onClick={(e) => onLoginClick(e)}
            href="#"
          >
            login now!
          </a>
        </Form.Item>
      </Form>
    </Card>
  );
};
