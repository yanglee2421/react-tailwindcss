// Antd Imports
import { Button, Divider, Typography, Alert } from "antd";
import {
  GithubOutlined,
  GoogleOutlined,
  FacebookOutlined,
  TwitterOutlined,
} from "@ant-design/icons";

// React Imports
import { useEffect, useRef } from "react";

// Components Imports
import { FormLogin } from "./form-login";
import { IconReact } from "@/components";

// Assets Imports
import justHer from "@/assets/image/bg/justHer.jpg";

export function Component() {
  // IntersectionObserver Hooks
  const elRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = elRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([{ isIntersecting, intersectionRatio }], observer) => {
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
      <main className="flex h-full ">
        <section
          ref={elRef}
          className="flex-1 bg-fixed bg-cover relative"
          style={{ backgroundImage: `url(${justHer})` }}
        >
          <div className="absolute top-6 left-9 flex items-center gap-3">
            <IconReact />
            <Typography.Title level={2} className="!mb-0 !text-slate-200">
              Yang_Lee
            </Typography.Title>
          </div>
        </section>
        <section className="w-full md:max-w-md flex flex-col justify-center px-6 shadow-lg">
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
          <FormLogin />
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
        </section>
      </main>
    </>
  );
}
