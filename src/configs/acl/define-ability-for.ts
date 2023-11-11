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
      cannot("read", "Page");
      break;
    default:
      cannot("read", "all");
  }

  return build();
}

export type AppAbility = MongoAbility<[Actions, Subjects]>;
type Actions = "manage" | "create" | "read" | "update" | "delete";
type Subjects = "all" | "User" | "Article" | "Page";
