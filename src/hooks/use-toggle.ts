// React Imports
import React from "react";

export function useToggle() {
  const [bool, setBool] = React.useState(false);
  const setToggle = React.useCallback(
    (params: React.SetStateAction<boolean> = (p) => !p) => {
      setBool(params);
    },
    [setBool]
  );
  return [bool, setToggle] as [typeof bool, typeof setToggle];
}
