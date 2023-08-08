// Yup Imports
import * as yup from "yup";

export function getSchema() {
  return {
    string: yup
      .string()
      .default("")
      .transform((v, o) => (o ? String(v) : "")),
    number: yup
      .number()
      .default(0)
      .transform((v, o) => (o ? Number(v) : 0)),
    boolean: yup
      .boolean()
      .default(false)
      .transform((v, o) => (o ? Boolean(v) : false)),

    stringNullable: yup
      .string()
      .nullable()
      .default(null)
      .transform((v, o) => (o ? String(v) : null)),
    numberNullable: yup
      .number()
      .nullable()
      .default(null)
      .transform((v, o) => (o ? Number(v) : null)),
  };
}
