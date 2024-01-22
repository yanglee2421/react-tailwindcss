// Router Imports
import { Navigate, useMatches, useSearchParams } from "react-router-dom";

export function HomeRoute() {
  const matches = useMatches();
  const [searchParams] = useSearchParams();

  if (!matches[matches.length - 1]) {
    return null;
  }

  return (
    <Navigate
      to={{
        pathname: searchParams.get("returnURL") || "/",
      }}
    ></Navigate>
  );
}
