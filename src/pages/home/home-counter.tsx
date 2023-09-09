// Redux Imports
import { useAppSelector } from "@/redux";

export function HomeCounter() {
  console.log("home counter");
  const name = useAppSelector((s) => s.demo.data.name);
  return <>name:{name}</>;
}
