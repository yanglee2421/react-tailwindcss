import { useAcl } from "@/hooks/useAcl";
import type React from "react";

export function AclGuard(props: Props) {
  const acl = useAcl();

  if (acl.can(props.action, props.subject)) {
    return props.children;
  }

  return props.fallback;
}

type Props = {
  action: string;
  subject: string;
  children: React.ReactNode;
  fallback?: React.ReactNode;
};
