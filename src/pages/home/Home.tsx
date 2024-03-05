import { Box } from "@mui/system";
import { Button } from "antd";
import { getAuth, signOut } from "firebase/auth";
import { app } from "@/api/firebase/app";

export function Home() {
  return (
    <Box sx={{ height: "100%" }}>
      <Button
        onClick={() => {
          signOut(getAuth(app));
        }}
        type="primary"
        danger
      >
        Sign Out
      </Button>
    </Box>
  );
}
