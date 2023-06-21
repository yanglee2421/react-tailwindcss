// Redux Imports
import { sliceLogin, useAppDispatch } from "@/redux";

// Form Imports
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { ItemEmail, ItemPassword, ItemIsRemember } from "./form-items";

// Hooks Imports
import { CtxForm } from "./hooks";

// React Imports
import React from "react";

// Utils Imports
import { toBase64 } from "@/utils";

export enum Fields {
  email = "email",
  pwd = "password",
  isChk = "isRemember",
}

export interface FormValues {
  [Fields.email]: string;
  [Fields.pwd]: string;
  [Fields.isChk]: boolean;
}

export function Component() {
  const dispatch = useAppDispatch();

  const schema = getSchema();
  const formReturn = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      [Fields.email]: "",
      [Fields.pwd]: "",
      [Fields.isChk]: false,
    },
  });

  // Submit & reset
  const handleReset = () => formReturn.reset();
  const handleSubmit = formReturn.handleSubmit((data: unknown) => {
    console.log(data);
    dispatch(sliceLogin.actions.actSetState(true));
  });

  // File Change
  const handleChange: HandleChange = async (evt) => {
    const { files } = evt.target;
    if (!files) return;

    const file = files[0];
    const data = await toBase64(file);
    console.log(data);
  };

  return (
    <div className="h-100">
      <form onSubmit={handleSubmit} onReset={handleReset} noValidate>
        <CtxForm.Provider value={{ ...formReturn }}>
          <ItemEmail field={Fields.email}></ItemEmail>
          <ItemPassword field={Fields.pwd}></ItemPassword>
          <ItemIsRemember field={Fields.isChk}></ItemIsRemember>
        </CtxForm.Provider>
        <input type="file" onChange={handleChange} />
        <div>
          <button type="submit">login</button>
          <button type="reset">reset</button>
        </div>
      </form>
    </div>
  );
}
type HandleChange = React.ChangeEventHandler<HTMLInputElement>;

// Validate fields rules
function getSchema() {
  return yup.object().shape({
    email: yup
      .string()
      .required()
      .email()
      .max(30)
      .test((v, { createError }) => {
        if (v === "yanglee2421@gmail.com") return true;
        return createError({ message: "Email不正确" });
      }),
    password: yup
      .string()
      .required()
      .max(16)
      .test((v, { createError }) => {
        if (v === "admin") return true;
        return createError({ message: "密码不正确" });
      }),
    isRemember: yup.boolean().test((v, { createError }) => {
      if (v) return true;
      return createError({ message: "不记住你登nm" });
    }),
  });
}
