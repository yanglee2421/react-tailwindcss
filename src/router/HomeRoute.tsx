// Router Imports
import { Navigate, useMatches, useSearchParams } from "react-router-dom";

export function HomeRoute() {
  const matches = useMatches();
  const [searchParams] = useSearchParams();

  const currentRoute = matches[matches.length - 1];

  if (!currentRoute) {
    return null;
  }

  const pathname = searchParams.get("returnURL");

  return (
    <Navigate
      to={{
        pathname: pathname || "/",
      }}
    ></Navigate>
  );
}
