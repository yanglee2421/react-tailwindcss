// Acl Imports
import { useAbility } from "@casl/react";

// React Imports
import React from "react";

// Types Imports
import { AppAbility, defineAbilityFor } from "./define-ability-for";

// Redux Imports
import { useAppSelector } from "@/redux";

const ability = defineAbilityFor("client");
const AclContext = React.createContext<AppAbility>(ability);

export const useAcl = () => useAbility(AclContext);

export function AclProvider(props: React.PropsWithChildren) {
  // ** Props
  const { children } = props;

  const usr = useAppSelector((s) => s.login.usr);
  const ability = defineAbilityFor(usr?.role || "");

  return <AclContext.Provider value={ability}>{children}</AclContext.Provider>;
}
