// Antd Imports
import { Button } from "antd";

// MUI Imports
import { styled } from "@mui/system";

export function Home() {
  return (
    <>
      <StyledDiv sx={{ height: "100%" }}>
        <Button>click me</Button>
      </StyledDiv>
    </>
  );
}

const StyledDiv = styled("div")({});
