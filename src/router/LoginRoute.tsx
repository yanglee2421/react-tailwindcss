import { Navigate, useMatches, useSearchParams } from "react-router-dom";

export function LoginRoute() {
  const matches = useMatches();
  const [searchParams] = useSearchParams();

  const currentRoute = matches.at(-1);

  if (!currentRoute) {
    return null;
  }

  searchParams.set("returnURL", currentRoute.pathname);

  return (
    <Navigate
      to={{
        pathname: "/login",
        search: searchParams.toString(),
        hash: void 0,
      }}
    ></Navigate>
  );
}
