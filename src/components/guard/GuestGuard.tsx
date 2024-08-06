import { useCurrentUser } from "@/hooks/store/useCurrentUser";

export function GuestGuard(props: React.PropsWithChildren) {
  const currentUser = useCurrentUser();

  if (currentUser) {
    return null;
  }

  return props.children;
}
