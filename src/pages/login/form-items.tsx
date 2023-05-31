import { Controller, Control } from "react-hook-form";

interface FieldsValue {
  email: string;
  password: string;
  checkbox: boolean;
  tel: string;
}

interface ItemEmailProps {
  control: Control<FieldsValue>;
}

export function ItemTell(props: ItemEmailProps) {
  const { control } = props;
  return (
    <Controller
      name="tel"
      control={control}
      defaultValue=""
      rules={{ required: "tel is required" }}
      render={({ field, fieldState: { error } }) => {
        return (
          <div>
            <input
              type="tel"
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              ref={field.ref}
              name={field.name}
            />
            {error && <p>{error.message}</p>}
          </div>
        );
      }}
    ></Controller>
  );
}
