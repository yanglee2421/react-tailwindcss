import React from "react";
import { useController, useForm, Control } from "react-hook-form";

interface FormData {
  email: string;
  password: string;
}

export function Form() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      email: "",
      password: "",
    },
    reValidateMode: "onChange",
  });

  const onSubmit = (data: FormData) => {
    console.log(data);
  };
  const onReset = () => reset();

  return (
    <form action="#" onSubmit={handleSubmit(onSubmit)} onReset={onReset}>
      <input type="email" {...register("email")} />
      {errors.email && <p>{errors.email.message}</p>}
      <input type="password" {...register("password")} />
      {errors.password && <p>{errors.password.message}</p>}
      <input type="submit" value="submit" />
      <input type="reset" value="reset" />
    </form>
  );
}

interface FieldsValue {
  email: string;
  password: string;
  checkbox: boolean;
}

interface CheckboxProps {
  control: Control<FieldsValue>;
}

type HandleChange = React.ChangeEventHandler<HTMLInputElement>;

export function Checkbox(props: CheckboxProps) {
  const { control } = props;

  const {
    field,
    fieldState: { error, isDirty },
    formState,
  } = useController({
    control,
    name: "checkbox",
    rules: { required: { value: true, message: "checkbox required" } },
  });

  const handleChange: HandleChange = (evt) => {
    const value = evt.target.checked;
    field.onChange(value);
  };

  console.log(error, isDirty);
  console.log(formState);

  return (
    <div>
      <input
        type="checkbox"
        ref={field.ref}
        checked={field.value}
        onChange={handleChange}
        onBlur={field.onBlur}
        name={field.name}
      />
      {error && <p>{error.message}</p>}
    </div>
  );
}
