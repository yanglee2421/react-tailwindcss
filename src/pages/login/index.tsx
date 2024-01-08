// Antd Imports
import { Button, Divider, Typography } from "antd";
import {
  GithubOutlined,
  GoogleOutlined,
  FacebookOutlined,
  TwitterOutlined,
} from "@ant-design/icons";

// Components Imports
import { FormLogin } from "./form-login";
import { IconReact } from "@/components";

// Assets Imports
import justHer from "@/assets/image/bg/justHer.jpg";

// MUI Imports
import { styled } from "@mui/system";

export function Component() {
  return (
    <>
      <StyledMain
        sx={{
          display: "flex",
          height: "100%",
        }}
      >
        <StyledSection
          sx={{
            position: "relative",
            flex: 1,
            overflow: "hidden",
            backgroundAttachment: "fixed",
            backgroundSize: "cover",
            backgroundImage: `url(${justHer})`,
          }}
        >
          <StyledDiv
            sx={{
              position: "absolute",
              top: 6,
              left: 9,
              display: "flex",
              alignItems: "center",
              gap: 3,
            }}
          >
            <IconReact></IconReact>
            <Typography.Title level={2}>Yang_Lee</Typography.Title>
          </StyledDiv>
        </StyledSection>
        <StyledSection
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
          <StyledDiv
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: 3,
            }}
          >
            <Typography.Text>New on our platform?</Typography.Text>
            <Typography.Link underline>Create an account</Typography.Link>
          </StyledDiv>
          <Divider>Or</Divider>
          <StyledDiv
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
          </StyledDiv>
        </StyledSection>
      </StyledMain>
    </>
  );
}

const StyledMain = styled("main")({});
const StyledSection = styled("section")({});
const StyledDiv = styled("div")({});
