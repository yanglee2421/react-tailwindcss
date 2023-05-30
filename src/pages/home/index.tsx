import { useAppDispatch, login } from "@/redux";
import style from "./home.module.scss";
import { useStyle } from "@/hooks";
import { useForm, Controller } from "react-hook-form";

export function Component() {
  const cx = useStyle(style);

  const disPatch = useAppDispatch();
  const handleLogout = () => {
    disPatch(login.actions.actSetState(false));
  };

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: { email: "", password: "" },
    reValidateMode: "onSubmit",
  });

  const onSubmit = (data: unknown) => {
    console.log(data);
  };

  return (
    <div className={cx("home b h-100")}>
      <div>
        <form
          action="#"
          onSubmit={handleSubmit(onSubmit)}
          onReset={() => reset()}
          className={cx("home__form")}
        >
          <label>Email</label>
          <input
            type="text"
            {...register("email", {
              required: {
                value: true,
                message: "nmsl",
              },
              valueAsNumber: false,
              validate(value) {
                const isEmail = value.includes("@");
                if (!isEmail) return "msg@";
              },
            })}
          />
          {errors.email && (
            <p className="text-danger">{errors.email.message}</p>
          )}
          <Controller
            control={control}
            name="password"
            rules={{ required: { value: true, message: "wdnmd" } }}
            render={({ field: { onChange, value }, formState: { errors } }) => {
              return (
                <>
                  <label>
                    <span>password</span>
                  </label>
                  <input type="password" value={value} onChange={onChange} />
                  {errors.password && (
                    <p className="text-danger">{errors.password.message}</p>
                  )}
                </>
              );
            }}
          ></Controller>
          <button type="submit">提交</button>
          <button type="reset">reset</button>
        </form>
      </div>
      <button onClick={handleLogout}>log out</button>
    </div>
  );
}
