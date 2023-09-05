// React Imports
import React from "react";

// Types Imports
import { defineAbilityFor } from "./define-ability-for";

// Context Imports
import { AclContext } from "./use-acl";

// Login Imports
import { useLogin } from "@/hooks";

export function AclProvider(props: React.PropsWithChildren) {
  // ** Props
  const { children } = props;

  const { usr } = useLogin();
  const ability = defineAbilityFor(usr?.role || "");

  return <AclContext.Provider value={ability}>{children}</AclContext.Provider>;
}
