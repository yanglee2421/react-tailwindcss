import { RouterProvider } from "react-router-dom";
import { ConfigProvider, theme } from "antd";
import { router } from "@/routes";

export function App() {
  const { darkAlgorithm, defaultAlgorithm } = theme;
  const algorithm = false ? darkAlgorithm : defaultAlgorithm;

  return (
    <ConfigProvider theme={{ algorithm }}>
      <RouterProvider router={router} />
    </ConfigProvider>
  );
}
