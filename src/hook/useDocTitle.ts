import { useEffect } from "react";
/**
 * 挂载时设置网页标题，卸载时还原
 * @param title 网页标题
 * @returns 设置后的网页标题
 */
export function useDocTitle(title: string) {
  const prevTitle = document.title;
  if (typeof title !== "string") return prevTitle;
  useEffect(() => {
    document.title = title;
    return () => {
      document.title = prevTitle;
    };
  }, []);
  return title;
}
