// Antd Imports
import { Button } from "antd";

// MUI Imports
import { styled } from "@mui/system";
import { getAuth, signOut } from "firebase/auth";
import { app } from "@/api/firebase";

export function Home() {
  const handleSignOut = () => {
    signOut(getAuth(app));
  };

  return (
    <>
      <StyledDiv sx={{ height: "100%" }}>
        <Button onClick={handleSignOut} type="primary" danger>
          Sign Out
        </Button>
      </StyledDiv>
    </>
  );
}

const StyledDiv = styled("div")({});
