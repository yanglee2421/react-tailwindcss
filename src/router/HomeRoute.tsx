// Router Imports
import { Navigate, useMatches, useSearchParams } from "react-router-dom";

export function HomeRoute() {
  const matches = useMatches();
  const [searchParams] = useSearchParams();

  if (!matches[matches.length - 1]) {
    return null;
  }

  const pathname = searchParams.get("returnURL") || "/";
  searchParams.delete("returnURL");

  return (
    <Navigate
      to={{
        pathname,
        search: searchParams.toString(),
      }}
    ></Navigate>
  );
}
