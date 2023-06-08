import { login, useAppDispatch } from "@/redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useId } from "react";

export function Component() {
  const dispatch = useAppDispatch();
  const handleLogin = () => {
    dispatch(login.actions.actSetState(true));
  };

  const schema = yup.object().shape({
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
  // const schema = yup.object({
  //   email: yup.string().required().email().max(30).default("usr"),
  //   password: yup.string().required().max(16).default("pwd"),
  // });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
      password: "",
      isRemember: false,
    },
  });

  const onSubmit = (data: unknown) => {
    console.log(data);
    handleLogin();
  };
  const handleReset = () => {
    reset();
  };

  const uid = useId();

  return (
    <div className="h-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        onReset={handleReset}
        action="#"
        noValidate
        className="b"
      >
        <div>
          <label>user:</label>
          <input type="email" maxLength={30} {...register("email")} />
          {errors.email && (
            <p className="text-danger">{errors.email.message}</p>
          )}
        </div>
        <div>
          <label>Email:</label>
          <input type="password" maxLength={16} {...register("password")} />
          {errors.password && (
            <p className="text-danger">{errors.password.message}</p>
          )}
        </div>
        <div>
          <label htmlFor={uid}>IsRemember:</label>
          <input type="checkbox" id={uid} {...register("isRemember")} />
          {errors.isRemember && (
            <p className="text-danger">{errors.isRemember.message}</p>
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
