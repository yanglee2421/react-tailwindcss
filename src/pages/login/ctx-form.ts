import React, { useContext } from "react";
import type { UseFormReturn } from "react-hook-form";
import type { FormValues } from "./index";

type CtxValue = UseFormReturn<FormValues> | null;

export const CtxForm = React.createContext<CtxValue>(null);

export const useFormCtx = () => useContext(CtxForm);
