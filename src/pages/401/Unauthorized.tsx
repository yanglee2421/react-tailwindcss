import {
  GithubOutlined,
  GoogleOutlined,
  FacebookOutlined,
  TwitterOutlined,
} from "@ant-design/icons";
import { Box } from "@mui/system";
import { Button, Divider, Typography } from "antd";

import justHer from "@/assets/image/bg/justHer.jpg";

import { FormLogin } from "./form-login";



export function Unauthorized() {
  return (
    <>
      <Box
        component={"main"}
        sx={{
          display: "flex",
          height: "100%",
        }}
      >
        <Box
          component={"section"}
          sx={{
            position: "relative",
            flex: 1,
            overflow: "hidden",
            backgroundAttachment: "fixed",
            backgroundSize: "cover",
            backgroundImage: `url(${justHer})`,
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: 6,
              left: 9,
              display: "flex",
              alignItems: "center",
              gap: 3,
            }}
          >
            <Typography.Title level={2}>Yang_Lee</Typography.Title>
          </Box>
        </Box>
        <Box
          component={"section"}
          sx={(theme) => {
            return {
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              paddingInline: 6,
              width: "100%",
              maxWidth: {
                md: theme.spacing(28 * 4),
              },
            };
          }}
        >
          <Typography.Title level={2}>Wellcome to here!</Typography.Title>
          <Typography.Paragraph>
            Please sign-in to your account and start the adventure.
          </Typography.Paragraph>
          <FormLogin></FormLogin>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: 3,
            }}
          >
            <Typography.Text>New on our platform?</Typography.Text>
            <Typography.Link underline>Create an account</Typography.Link>
          </Box>
          <Divider>Or</Divider>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: 3,
            }}
          >
            <Button
              shape="circle"
              size="large"
              icon={<FacebookOutlined></FacebookOutlined>}
            />
            <Button
              shape="circle"
              size="large"
              icon={<TwitterOutlined className="text-blue-500" />}
            />
            <Button
              shape="circle"
              size="large"
              icon={<GithubOutlined></GithubOutlined>}
            />
            <Button
              shape="circle"
              size="large"
              icon={<GoogleOutlined></GoogleOutlined>}
            />
          </Box>
        </Box>
      </Box>
    </>
  );
}
