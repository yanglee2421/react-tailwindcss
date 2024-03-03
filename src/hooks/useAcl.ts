import { useAbility } from "@casl/react";
import React from "react";
import { AppAbility, defineAbilityFor } from "@/utils/defineAbilityFor";

export const AclContext = React.createContext<AppAbility>(defineAbilityFor(""));
export const useAcl = () => useAbility(AclContext);
