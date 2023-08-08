// MUI Imports
import {
  Select,
  SelectProps,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";

// I18n Imports
import { useTranslation } from "react-i18next";
import { locales } from "@/i18n";

export function LangSelect(props: LangSelectProps) {
  // ** Props
  const { required, sx, ...restProps } = props;

  // I18n Hooks
  const { i18n } = useTranslation();
  const { language, changeLanguage } = i18n;

  // Model & Change
  const model = locales.find((item) => item.includes(language));
  const handleChang: SelectProps["onChange"] = (evt) => {
    const { value } = evt.target;
    changeLanguage(String(value));
  };

  return (
    <FormControl fullWidth required={required} sx={sx}>
      <InputLabel>Lang</InputLabel>
      <Select
        label="Lang"
        {...restProps}
        value={model || ""}
        onChange={handleChang}
      >
        {getOptions()}
      </Select>
    </FormControl>
  );
}

function getOptions() {
  return locales.map((item) => {
    return (
      <MenuItem key={item} value={item}>
        {item}
      </MenuItem>
    );
  });
}

export interface LangSelectProps extends SelectProps {
  whatever: unknown;
}
