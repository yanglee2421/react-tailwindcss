import { useContext } from "react";
import { CtxForm } from "../ctx-form";

export function useFormCtx() {
  return useContext(CtxForm);
}
