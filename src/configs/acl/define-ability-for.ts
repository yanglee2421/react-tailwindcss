// Acl Imports
import {
  MongoAbility,
  createMongoAbility,
  CreateAbility,
  AbilityBuilder,
} from "@casl/ability";

const createAppAbility = createMongoAbility as CreateAbility<AppAbility>;

export function defineAbilityFor(role: string) {
  const { can, build } = new AbilityBuilder(createAppAbility);

  switch (role) {
    case "admin":
      // @ts-ignore
      can("manage", "all");
      break;
    case "client":
      // @ts-ignore
      can("read", "all");
      break;
  }

  return build();
}

type CRUD = "create" | "read" | "update" | "delete";
type Abilities = ["read", "User"] | [CRUD, "Article"];
export type AppAbility = MongoAbility<Abilities>;
