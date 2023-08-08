// MUI Imports
import { TextField, TextFieldProps } from "@mui/material";

// Form Imports
import { useFormContext, useController } from "react-hook-form";

export type ItemTextProps = TextFieldProps & { name: string };

export function ItemText(props: ItemTextProps) {
  // ** Props
  const { name, ...restProps } = props;

  // ** Form
  const { control } = useFormContext();

  // ** Field
  const { field, fieldState } = useController({
    name,
    control,
    defaultValue: "",
  });
  const { value } = field;
  const model = value ? String(value) : "";
  const { error } = fieldState;

  return (
    <TextField
      fullWidth
      {...restProps}
      {...field}
      value={model}
      error={!!error}
      helperText={error?.message}
    />
  );
}
