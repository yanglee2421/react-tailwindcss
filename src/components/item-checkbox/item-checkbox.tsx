// MUI Imports
import { Checkbox, CheckboxProps } from "@mui/material";

// Form Imports
import { useFormContext, useController } from "react-hook-form";

export function ItemCheckbox(props: ItemCheckboxProps) {
  // ** Props
  const { name, value, ...restProps } = props;

  // Form Field
  const { control } = useFormContext();
  const { field } = useController({ name, control, defaultValue: false });
  const fieldValue = field.value;

  // Model & Change
  const model = toModel(value, fieldValue);
  const handleChange: HandleChange = (evt, checked) => {
    void evt;
    const nextFieldValue = toNextValue(checked, value, fieldValue);
    field.onChange(nextFieldValue);
  };

  return (
    <Checkbox
      {...restProps}
      {...field}
      checked={model}
      onChange={handleChange}
    />
  );
}

function toModel(value: unknown, fieldValue: unknown) {
  const isVoid = value === void 0;
  if (isVoid) return Boolean(fieldValue);

  const list = toList(fieldValue);
  return list.includes(value);
}

function toList(fieldValue: unknown) {
  const isList = Array.isArray(fieldValue);
  return isList ? fieldValue : [];
}

function toNextValue(checked: boolean, value: unknown, fieldValue: unknown) {
  const isVoid = value === void 0;
  if (isVoid) return checked;

  const list = toList(fieldValue);
  const isHasExist = list.includes(value);

  // Not Change
  if (isHasExist && checked) return list;
  if (!isHasExist && !checked) return list;

  // Remove Checked
  if (isHasExist && !checked) return list.filter((el) => el !== value);

  // Add Checked
  if (!isHasExist && checked) return [...list, value];
}

export interface ItemCheckboxProps extends CheckboxProps {
  name: string;
}

type HandleChange = CheckboxProps["onChange"];
