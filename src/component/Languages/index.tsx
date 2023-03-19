import { Select, SelectProps } from "antd";

export function Languages(props: SelectProps) {
  const { ...restProps } = props;

  return (
    <Select
      {...restProps}
      mode="multiple"
      allowClear
      placeholder="Search by languages"
      options={languages()}
      className="w-100"
    />
  );
}

function languages() {
  return [
    { label: "Chinese (Simplified)", value: "Chinese (Simplified)" },
    { label: "Chinese (Traditional)", value: "Chinese (Traditional)" },
    { label: "Czech", value: "Czech" },
    { label: "Danish", value: "Danish" },
    { label: "Dutch", value: "Dutch" },
    { label: "English(US)", value: "English(US)" },
    { label: "English(UK)", value: "English(UK)" },
    { label: "English(AU)", value: "English(AU)" },
    { label: "English(CA)", value: "English(CA)" },
    { label: "Finnish", value: "Finnish" },
    { label: "French", value: "French" },
    { label: "German", value: "German" },
    { label: "Italian", value: "Italian" },
    { label: "Japanese", value: "Japanese" },
    { label: "Korean", value: "Korean" },
    { label: "Norwegian", value: "Norwegian" },
    { label: "Polish", value: "Polish" },
    { label: "Norwegian", value: "Norwegian" },
    { label: "Portuguese(Brazil)", value: "Portuguese(Brazil)" },
    { label: "Portuguese(Portugal)", value: "Portuguese(Portugal)" },
    { label: "Spanish", value: "Spanish" },
    { label: "Swedish", value: "Swedish" },
    { label: "Thai", value: "Thai" },
    { label: "Turkish", value: "Turkish" },
    { label: "Vietnamese", value: "Vietnamese" },
  ];
}
