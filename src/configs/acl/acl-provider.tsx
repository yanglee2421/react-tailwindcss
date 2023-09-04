// React Imports
import React from "react";

// Types Imports
import { defineAbilityFor } from "./define-ability-for";

// Redux Imports
import { useAppSelector } from "@/redux";

// Context Imports
import { AclContext } from "./use-acl";

export function AclProvider(props: React.PropsWithChildren) {
  // ** Props
  const { children } = props;

  const usr = useAppSelector((s) => s.login.usr);
  const ability = defineAbilityFor(usr?.role || "");

  return <AclContext.Provider value={ability}>{children}</AclContext.Provider>;
}
