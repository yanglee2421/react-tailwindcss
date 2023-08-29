// Acl Imports
import {
  AbilityBuilder,
  createMongoAbility,
  CreateAbility,
  MongoAbility,
} from "@casl/ability";

const createAppAbility = createMongoAbility as CreateAbility<AppAbility>;

export const defineAbilityFor = (role: string) => {
  const { can, build } = new AbilityBuilder(createAppAbility);

  switch (role) {
    case "admin":
      can("manage", "all");
      break;
    case "client":
      can(["read"], ["Article"]);
      break;
  }

  return build();
};

export type AppAbility = MongoAbility<Abilities>;
type CRUD = "create" | "read" | "update" | "delete" | "manage";
type Abilities = ["read", "User"] | [CRUD, "Article"] | [CRUD, "all"];
