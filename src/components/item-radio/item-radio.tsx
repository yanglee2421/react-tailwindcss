// MUI Imports
import { Radio, RadioProps } from "@mui/material";

// Form Imports
import { useFormContext, useController } from "react-hook-form";

export function ItemRadio(props: ItemRadioProps) {
  // ** Props
  const { value, name, ...restProps } = props;

  // Form Field
  const { control } = useFormContext();
  const { field } = useController({ name, control, defaultValue: false });
  const fieldValue = field.value;

  // Model & Change
  const isVoid = fieldValue === void 0;
  const model = isVoid ? Boolean(fieldValue) : fieldValue === value;
  const handleChange: HandleChange = (evt, checked) => {
    void evt;
    field.onChange(value ?? checked);
  };

  return (
    <Radio {...restProps} {...field} checked={model} onChange={handleChange} />
  );
}

export interface ItemRadioProps extends RadioProps {
  name: string;
}

type HandleChange = RadioProps["onChange"];
