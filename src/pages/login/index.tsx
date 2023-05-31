import { login, useAppDispatch } from "@/redux";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useId } from "react";
// import { Checkbox } from "./form";
import { ItemTell } from "./form-items";

export function Component() {
  const dispatch = useAppDispatch();
  const handleLogin = () => {
    dispatch(login.actions.actSetState(true));
  };

  useQuery({
    queryKey: ["unique"],
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    control,
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      checkbox: false,
      tel: "",
    },
  });

  const onSubmit = (data: unknown) => {
    console.log(data);
    handleLogin();
  };
  const handleReset = () => {
    reset();
  };

  const emailId = useId();
  const pwdId = useId();

  return (
    <div className="h-100">
      <form action="#" onSubmit={handleSubmit(onSubmit)} onReset={handleReset}>
        <ItemTell control={control}></ItemTell>
        {/* <Checkbox control={control}></Checkbox> */}
        <div>
          <label htmlFor={emailId}>Email</label>
          <input
            type="email"
            id={emailId}
            maxLength={30}
            {...register("email", {
              required: {
                value: true,
                message: "email is required",
              },
              minLength: {
                value: 8,
                message: "字符长度在8-30位",
              },
              maxLength: {
                value: 30,
                message: "字符长度在8-30位",
              },
            })}
          />
          {errors.email && (
            <p className="text-danger">{errors.email.message}</p>
          )}
        </div>
        <div>
          <label htmlFor={pwdId}>Password</label>
          <input
            type="password"
            id={pwdId}
            maxLength={16}
            {...register("password", {
              required: {
                value: true,
                message: "pwd is required",
              },
              minLength: {
                value: 8,
                message: "字符长度在8-16位",
              },
              maxLength: {
                value: 16,
                message: "字符长度在8-16位",
              },
            })}
          />
          {errors.password && (
            <p className="text-danger">{errors.password.message}</p>
          )}
        </div>
        <div>
          <button type="submit">login</button>
          <button type="reset">reset</button>
        </div>
      </form>
    </div>
  );
}
