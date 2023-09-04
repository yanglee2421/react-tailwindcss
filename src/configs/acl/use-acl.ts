// Acl Imports
import { useAbility } from "@casl/react";

// React Imports
import React from "react";

// Types Imports
import { AppAbility, defineAbilityFor } from "./define-ability-for";

const ability = defineAbilityFor("client");
export const AclContext = React.createContext<AppAbility>(ability);

export const useAcl = () => useAbility(AclContext);
