import { useCurrentUser } from "@/hooks/store/useCurrentUser";

export function AuthGuard(props: React.PropsWithChildren) {
  const currentUser = useCurrentUser();

  if (currentUser) {
    return props.children;
  }

  return null;
}
