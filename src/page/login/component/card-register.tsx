import style from "../login.module.scss";
import { Button, Card, Form, Input, message } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { useClass } from "@/hook";
import { useRegisterMutation } from "@/api/api-rtkq";
import { preventDefault } from "@/util";
import React, { useCallback, useState } from "react";
const cn = useClass(style);
/**
 * CardRegistry 的类型空间
 */
namespace Type {
  type validateStatus =
    | ""
    | "error"
    | "validating"
    | "success"
    | "warning"
    | undefined;
  export interface props {
    isRegister: boolean;
    onLoginClick(): void;
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
/**
 * PageLogin 的 CardRegister 组件
 */
export function CardRegister(props: Type.props) {
  const { isRegister, onLoginClick } = props;
  const clickHandler = useCallback(preventDefault(onLoginClick), []);
  // 处理注册
  const [registerFn] = useRegisterMutation();
  const [form] = Form.useForm();
  const [validate, setValidate] = useState<Type.validate>({
    validateStatus: undefined,
    help: undefined,
  });
  const onFinish = useCallback((formData: Type.formData) => {
    registerFn(formData)
      .unwrap()
      .then((res) => {
        if (res.isOk) {
          message.success(res.message);
          onLoginClick();
          return;
        }
        message.warning(res.message);
      })
      .catch((err) => console.error(err));
  }, []);
  // 表单校验
  const onValuesChange = useCallback(
    (chgValue: Partial<Type.formData>, allValue: Type.formData) => {
      if (!chgValue.password2) return;
      const { password } = allValue;
      setValidate((prev) => {
        const isOk = chgValue.password2 === password;
        return {
          ...prev,
          validateStatus: isOk ? undefined : "error",
          help: isOk ? undefined : "两次输入的密码不一致！",
        };
      });
    },
    []
  );
  return (
    <Card className={cn(["card-register", isRegister ? "rotate-y-0" : ""])}>
      <Form form={form} onFinish={onFinish} onValuesChange={onValuesChange}>
        <Form.Item name="username" rules={[{ required: true }]}>
          <Input
            prefix={<UserOutlined className={cn("site-form-item-icon")} />}
            placeholder="手机号"
          />
        </Form.Item>
        <Form.Item name="password" rules={[{ required: true }]}>
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
          <a onClick={clickHandler} href="xxx">
            login now!
          </a>
        </Form.Item>
      </Form>
    </Card>
  );
}
