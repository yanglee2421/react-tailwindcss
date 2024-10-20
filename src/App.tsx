import { QueryProvider } from "@/components/QueryProvider";
import { NewTab } from "@/pages/newtab/NewTab";
import { ThemeProvider } from "@/components/ThemeProvider";

export function App() {
  return (
    <QueryProvider>
      <ThemeProvider>
        <NewTab />
      </ThemeProvider>
    </QueryProvider>
  );
}
