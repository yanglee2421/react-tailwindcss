import { QueryProvider } from "@/components/QueryProvider";
import { NewTab } from "@/pages/newtab/NewTab";

export function App() {
  return (
    <QueryProvider>
      <NewTab />
    </QueryProvider>
  );
}
