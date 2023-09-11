// React Imports
import React, { useCallback, useState } from "react";

export function useToggle() {
  const [bool, setBool] = useState(false);
  const setToggle = useCallback(
    (params?: React.SetStateAction<boolean>) => {
      switch (params) {
        case void 0:
          setBool((p) => !p);
          break;
        default:
          setBool(params);
      }
    },
    [setBool]
  );
  return [bool, setToggle];
}
