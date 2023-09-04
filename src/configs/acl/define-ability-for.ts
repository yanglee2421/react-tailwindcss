// Acl Imports
import {
  MongoAbility,
  createMongoAbility,
  CreateAbility,
  AbilityBuilder,
} from "@casl/ability";

const createAppAbility = createMongoAbility as CreateAbility<AppAbility>;

export function defineAbilityFor(role: string) {
  const { can, cannot, build } = new AbilityBuilder(createAppAbility);

  switch (role) {
    case "admin":
      can("manage", "all");
      break;
    case "client":
      can("read", "all");
      break;
    default:
      cannot("manage", "all");
  }

  return build();
}

export type AppAbility = MongoAbility<Abilities>;
type CRUD = "create" | "read" | "update" | "delete";
type Abilities =
  | ["read" | "manage", "User" | "all"]
  | [CRUD | "manage", "Article" | "all"];
