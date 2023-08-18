// React Imports
import { useId } from "react";

// Form Imports
import { useController, useFormContext } from "react-hook-form";

interface ItemProps {
  field: string;
}

export function ItemEmail(props: ItemProps) {
  const { field } = props;

  const formCtx = useFormContext();

  const { register, formState } = formCtx;
  const { errors } = formState;
  const err = errors[field];

  return (
    <div>
      <label>user:</label>
      <input type="email" maxLength={30} {...register(field)} />
      {err && <p className="text-danger">{err.message}</p>}
    </div>
  );
}

export function ItemPassword(props: ItemProps) {
  const { field } = props;

  const formCtx = useFormContext();

  const { register, formState } = formCtx;
  const { errors } = formState;
  const err = errors[field];

  return (
    <div>
      <label>Email:</label>
      <input type="password" maxLength={16} {...register(field)} />
      {err && <p className="text-danger">{err.message}</p>}
    </div>
  );
}

export function ItemIsRemember(props: ItemProps) {
  const { field } = props;

  const { register, control } = useFormContext();
  const { fieldState } = useController({ control, name: field });

  const err = fieldState.error;

  const uid = useId();

  return (
    <div>
      <label htmlFor={uid}>IsRemember:</label>
      <input type="checkbox" id={uid} {...register(field)} />
      {err && <p className="text-danger">{err.message}</p>}
    </div>
  );
}
