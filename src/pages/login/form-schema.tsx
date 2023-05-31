import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";

const schema = yup.object({
  date: yup.string().required().min(8).max(18),
});

export function FormAddress() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),

    // Not recommoned
    async defaultValues() {
      return {
        date: "2022-01-01",
      };
    },
  });

  return (
    <form action="#" onSubmit={handleSubmit((d) => console.log(d))}>
      <div>
        <input type="date" {...register("date")} />
        {/* @ts-ignore */}
        {errors.date && <p>{errors.date?.message}</p>}
      </div>
      <input type="submit" value="submit" />
    </form>
  );
}
