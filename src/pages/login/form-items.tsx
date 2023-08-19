// React Imports
import { useId } from "react";

// Form Imports
import { useController, useFormContext } from "react-hook-form";

interface ItemProps {
  name: string;
}

export function ItemEmail(props: ItemProps) {
  const { name } = props;

  const { control } = useFormContext();
  const { field, fieldState } = useController({ control, name });

  const { error } = fieldState;

  return (
    <div>
      <label>user:</label>
      <input type="email" maxLength={30} {...field} />
      {error && <p className="text-danger">{error.message}</p>}
    </div>
  );
}

export function ItemPassword(props: ItemProps) {
  const { name } = props;

  const { control } = useFormContext();
  const { field, fieldState } = useController({ control, name });

  const { error } = fieldState;

  return (
    <div>
      <label>Email:</label>
      <input type="password" maxLength={16} {...field} />
      {error && <p className="text-danger">{error.message}</p>}
    </div>
  );
}

export function ItemIsRemember(props: ItemProps) {
  const { name } = props;

  const { control } = useFormContext();
  const { field, fieldState } = useController({ control, name });

  const { error } = fieldState;

  const uid = useId();

  return (
    <div>
      <label htmlFor={uid}>IsRemember:</label>
      <input type="checkbox" id={uid} {...field} />
      {error && <p className="text-danger">{error.message}</p>}
    </div>
  );
}
