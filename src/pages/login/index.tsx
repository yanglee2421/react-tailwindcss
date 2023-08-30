// Redux Imports
import { useAppDispatch, sliceLogin } from "@/redux";

// Antd Imports
import { Button, Col, Divider, Row, Typography, Alert } from "antd";
import {
  GithubOutlined,
  GoogleOutlined,
  FacebookOutlined,
  TwitterOutlined,
} from "@ant-design/icons";

// React Imports
import { useEffect, useRef } from "react";

// Components Imports
import { FormLogin, FormValues } from "./form-login";

export function Component() {
  // Redux Hooks
  const dispatch = useAppDispatch();

  const handleSignIn = (role: string) => {
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

  // Form Submit
  const handleSubmit = (data: FormValues) => {
    console.log(data);
    handleSignIn(data.passwd);
  };

  return (
    <>
      <Row className="h-full border">
        <Col xs={0} md={12} lg={14} xl={16} xxl={18}>
          <section ref={elRef}></section>
        </Col>
        <Col
          xs={24}
          md={12}
          lg={10}
          xl={8}
          xxl={6}
          className="flex flex-col justify-center border-0 border-l border-solid border-slate-300 px-10 md:px-8"
        >
          <Typography.Title level={2}>Wellcome to here!</Typography.Title>
          <Typography.Paragraph className="text-gray-400 text-base">
            Please sign-in to your account and start the adventure.
          </Typography.Paragraph>
          <Alert
            message={
              <div className="flex flex-col gap-1">
                <Typography.Text className="text-blue-500">
                  admin：<span className="font-semibold">admin@demo.com</span>
                  <span> / </span>
                  Pass：<span className="font-semibold">admin123456</span>
                </Typography.Text>
                <Typography.Text className="text-blue-500">
                  client：<span className="font-semibold">client@demo.com</span>
                  <span> / </span>
                  Pass：<span className="font-semibold">client123456</span>
                </Typography.Text>
              </div>
            }
            className="mb-5"
          />
          <FormLogin onSubmit={handleSubmit} />
          <div className="flex gap-3 justify-center">
            <Typography.Text>New on our platform?</Typography.Text>
            <Typography.Link underline>Create an account</Typography.Link>
          </div>
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
