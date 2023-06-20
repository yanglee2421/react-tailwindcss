// Router Imports
import { RouterProvider } from "react-router-dom";
import { router } from "@/routes";

// Antd Imports
import { ConfigProvider, theme } from "antd";

export function App() {
  const { darkAlgorithm, defaultAlgorithm } = theme;
  const algorithm = false ? darkAlgorithm : defaultAlgorithm;

  return (
    <ConfigProvider theme={{ algorithm }}>
      <RouterProvider router={router} />
    </ConfigProvider>
  );
}
