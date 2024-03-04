import { useAbility } from "@casl/react";
import React from "react";

import { defineAbilityFor } from "@/utils/defineAbilityFor";

import type { AppAbility} from "@/utils/defineAbilityFor";

export const AclContext = React.createContext<AppAbility>(defineAbilityFor(""));
export const useAcl = () => useAbility(AclContext);
