import { Button, Card, Form, Input, message } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import style from "./card-register.module.scss";
import { useClass } from "@/hook";
import React, { useState } from "react";
import { useRegisterMutation } from "@/api/api-rtkq";
const cn = useClass(style);
namespace type {
  type validateStatus =
    | ""
    | "error"
    | "validating"
    | "success"
    | "warning"
    | undefined;
  export interface props {
    isRegister: boolean;
    onLoginClick(e?: React.MouseEvent): void;
  }
  export interface formData {
    username: string;
    password: string;
    password2: string;
  }
  export interface validate {
    validateStatus: validateStatus;
    help?: string;
  }
}
export default (props: type.props) => {
  const { isRegister, onLoginClick } = props;
  const [registerFn, registerRes] = useRegisterMutation();
  const [form] = Form.useForm();
  const [validate, setValidate] = useState<type.validate>({
    validateStatus: undefined,
    help: undefined,
  });
  const onFinish = (formData: type.formData) => {
    registerFn(formData)
      .unwrap()
      .then((res) => {
        if (res.isOk) {
          message.success(res.mes);
          onLoginClick();
          return;
        }
        message.warning(res.mes);
      })
      .catch((err) => {
        console.error(err);
      });
  };
  const onValuesChange = (
    chgValue: Partial<type.formData>,
    allValue: type.formData
  ) => {
    if (!chgValue.password2) return;
    const { password } = allValue;
    setValidate((prev) => {
      const isOk = chgValue.password2 !== password;
      return {
        ...prev,
        validateStatus: isOk ? undefined : "error",
        help: isOk ? undefined : "两次输入的密码不一致！",
      };
    });
  };
  return (
    <Card className={cn(["card-register", isRegister ? "rotate-y-0" : ""])}>
      <Form
        form={form}
        onFinish={onFinish}
        onValuesChange={onValuesChange}
      >
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
          validateStatus={validate.validateStatus}
          help={validate.help}
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
