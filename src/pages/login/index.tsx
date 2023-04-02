import style from "./style.module.scss";
import { useStyle, useResize, useLogin } from "@/hooks";
import { Particles, preventDefault } from "@/utils";
import React, {
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";
import { Button, Card, Checkbox, Form, Input, message } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { useRegisterMutation, useLoginMutation } from "@/apis/api-rtkq";

namespace Type {
  export interface formValue {
    password: string;
    username: string;
    remember: boolean;
  }
  export interface props {
    isRegister: boolean;
    onLinkClick(): void;
  }
  type validateStatus =
    | ""
    | "error"
    | "validating"
    | "success"
    | "warning"
    | undefined;

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
 * 登录页面
 * @returns JSX
 */
export default function PageLogin() {
  const cn = useStyle(style);

  // 登录&注册卡片
  const [isRegister, setIsRegister] = useState(false);
  const switchHandler = useCallback(() => setIsRegister((prev) => !prev), []);
  const cards = useMemo(
    () => (
      <>
        <CardLogin {...{ isRegister }} onLinkClick={switchHandler} />
        <CardRegister {...{ isRegister }} onLinkClick={switchHandler} />
      </>
    ),
    [isRegister, switchHandler]
  );

  const cvsRef = useRef<HTMLCanvasElement>(null);
  const resizeRef = useResize<HTMLDivElement>((box) => {
    const cvs = cvsRef.current;
    if (!cvs) return;
    Object.assign(cvs, box);

    let particle: null | Particles = null;
    const timer = setTimeout(() => {
      particle = new Particles(cvs, (box.width / 1920) * 120);
      particle.animate();
      particle.bindEvent();
    }, 500);

    return () => {
      clearTimeout(timer);
      particle?.abortAnimate();
      particle?.abortEvent();
    };
  });

  return (
    <div ref={resizeRef} className={cn("login-root")}>
      <canvas ref={cvsRef} className={cn("login-cvs")}></canvas>
      <div className={cn("card-box")}>{cards}</div>
    </div>
  );
}

function CardLogin(props: Type.props) {
  const { isRegister, onLinkClick } = props;
  const cn = useStyle(style);

  const [loginFn] = useLoginMutation();
  // 表单提交
  const [form] = Form.useForm();
  const { signIn } = useLogin();
  const onFinish = async (value: Type.formValue) => {
    try {
      const res = await loginFn(value).unwrap();
      const { isOk, token, username: user, invalidTime: expiration, mes } = res;
      if (isOk) {
        signIn({ user, token, expiration }, value.remember);
        return;
      }
      message.warning(mes);
    } catch (err) {
      console.error(err);
    }
  };
  const clickHandler = preventDefault(onLinkClick);

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
          <Button type="primary" htmlType="submit" block>
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

function CardRegister(props: Type.props) {
  const { isRegister, onLinkClick } = props;
  const cn = useStyle(style);
  const clickHandler = preventDefault(onLinkClick);
  // 处理注册
  const [registerFn] = useRegisterMutation();
  const [form] = Form.useForm();
  const [validate, setValidate] = useState<Type.validate>({
    validateStatus: undefined,
    help: undefined,
  });

  const onFinish = (formData: Type.formData) => {
    registerFn(formData)
      .unwrap()
      .then((res) => {
        if (res.isOk) {
          message.success(res.message);
          onLinkClick();
          return;
        }
        message.warning(res.message);
      })
      .catch((err) => console.error(err));
  };
  // 表单校验
  const onValuesChange = (
    chgValue: Partial<Type.formData>,
    allValue: Type.formData
  ) => {
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
  };

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
          <Button type="primary" htmlType="submit" block>
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
