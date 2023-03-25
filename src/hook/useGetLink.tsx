import { useCallback } from "react";

/**
 * A hook for extracting and generating hyperlinks from a string
 * @returns A Function to extract and generate hyperlinks
 */
export function useGetLink(defMsg: string) {
  return useCallback(
    (str: unknown) => {
      if (typeof str !== "string") return defMsg;
      if (!str) return defMsg;

      const reg =
        /^(?<prefix>.*)(?<link>https?\:\/\/.+\.\w{2,3}(\:\d{2,5})?(\/\w+)*)(?<suffix>.*)$/gis;
      const res = reg.exec(str);
      if (!res) return str;
      const { groups } = res;
      if (!groups) return str;

      const { link } = groups;
      const a = (
        <a key={link} href={link} target="_blank">
          {link}
        </a>
      );

      return Object.values({ ...groups, link: a });
    },
    [defMsg]
  );
}
