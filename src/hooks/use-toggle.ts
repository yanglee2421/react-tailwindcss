import { useCallback, useState } from "react";

export function useToggle() {
  const [bool, setBool] = useState(false);
  const setToggle = useCallback(
    (params?: boolean) => {
      switch (params) {
        case true:
        case false:
          setBool(params);
          break;
        default:
          setBool((p) => !p);
      }
    },
    [setBool]
  );
  return [bool, setToggle];
}
