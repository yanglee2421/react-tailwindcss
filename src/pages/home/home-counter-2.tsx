// Redux Imports
import { useAppSelector } from "@/redux";

export function HomeCounter2() {
  console.log("home counter 2");

  const age = useAppSelector((s) => s.demo.data.age);
  return <>age:{age}</>;
}
