// Redux Imports
import { useAppDispatch, sliceLogin } from "@/redux";

// Antd Imports
import {
  Button,
  Checkbox,
  Col,
  Divider,
  Form,
  Input,
  Row,
  Typography,
} from "antd";
import {
  GithubOutlined,
  GoogleOutlined,
  FacebookOutlined,
  TwitterOutlined,
} from "@ant-design/icons";

// React Imports
import { useEffect, useRef } from "react";

export function Component() {
  // Redux Hooks
  const dispatch = useAppDispatch();

  const handleSignIn = (role: "admin" | "client") => {
    const roleAction = sliceLogin.actions.usr({ role });
    dispatch(roleAction);
  };

  // IntersectionObserver Hooks
  const elRef = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = elRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([{ isIntersecting, intersectionRatio }]) => {
        if (isIntersecting) {
          console.log("entry", intersectionRatio);
          observer.unobserve(el);
        }
      }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <Row className="h-full border">
        <Col xs={0} md={12} lg={14} xl={16}>
          <section ref={elRef}>this</section>
        </Col>
        <Col
          xs={24}
          md={12}
          lg={10}
          xl={8}
          className="flex flex-col justify-center border-0 border-l border-solid border-slate-300 px-10 md:px-8"
        >
          <Typography.Title>Wellcome to here!</Typography.Title>
          <Typography.Paragraph>lorem</Typography.Paragraph>
          <Form onFinish={handleSignIn} layout="vertical" size="large">
            <Form.Item label="Email">
              <Input type="email" />
            </Form.Item>
            <Form.Item label="Password">
              <Input.Password />
            </Form.Item>
            <Form.Item>
              <div className="flex justify-between">
                <Checkbox>Remember Me</Checkbox>
                <Typography.Link>Forgot password?</Typography.Link>
              </div>
            </Form.Item>
            <Form.Item>
              <Button
                htmlType="submit"
                type="primary"
                block
                className="uppercase font-medium"
              >
                Sign In As Admin
              </Button>
            </Form.Item>
            <Form.Item>
              <div className="flex gap-3 justify-center">
                <Typography.Text>New on our platform?</Typography.Text>
                <Typography.Link underline>Create an account</Typography.Link>
              </div>
            </Form.Item>
          </Form>
          <Divider>Or</Divider>
          <div className="flex justify-center gap-3">
            <Button shape="circle" size="large" icon={<FacebookOutlined />} />
            <Button
              shape="circle"
              size="large"
              icon={<TwitterOutlined className="text-blue-500" />}
            />
            <Button shape="circle" size="large" icon={<GithubOutlined />} />
            <Button
              shape="circle"
              size="large"
              icon={<GoogleOutlined className="text-red-500" />}
            />
          </div>
        </Col>
      </Row>
    </>
  );
}
