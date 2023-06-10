import { useId } from "react";
import { useFormCtx } from "./hooks";
import type { Fields } from "./index";

interface ItemProps {
  field: Fields;
}

export function ItemEmail(props: ItemProps) {
  const { field } = props;

  const formCtx = useFormCtx();
  if (!formCtx) throw new Error("no provider form-ctx");

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

  const formCtx = useFormCtx();
  if (!formCtx) throw new Error("no provider form-ctx");

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

  const formCtx = useFormCtx();
  if (!formCtx) throw new Error("no provider form-ctx");

  const { register, formState } = formCtx;
  const { errors } = formState;
  const err = errors[field];

  const uid = useId();

  return (
    <div>
      <label htmlFor={uid}>IsRemember:</label>
      <input type="checkbox" id={uid} {...register(field)} />
      {err && <p className="text-danger">{err.message}</p>}
    </div>
  );
}
