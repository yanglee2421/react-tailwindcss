import { RouterProvider } from "react-router-dom";
import { ConfigProvider, theme } from "antd";
import { GalleryWithPortal } from "@/components";
import { useDark } from "@/hooks";
import { useAppDispatch, useAppSelector, theme as slice } from "@/redux";
import { router } from "@/routes";

export function App() {
  const dispatch = useAppDispatch();
  useDark(({ matches }) => dispatch(slice.actions.actIsDark(matches)));

  const { darkAlgorithm, defaultAlgorithm } = theme;
  const isDark = useAppSelector((state) => state.theme.isDark);
  const algorithm = isDark ? darkAlgorithm : defaultAlgorithm;

  return (
    <ConfigProvider theme={{ algorithm }}>
      <RouterProvider router={router} />
      <GalleryWithPortal />
    </ConfigProvider>
  );
}
