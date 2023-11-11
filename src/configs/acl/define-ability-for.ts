// Acl Imports
import {
  MongoAbility,
  createMongoAbility,
  AbilityBuilder,
} from "@casl/ability";

export function defineAbilityFor(role: string) {
  const { can, cannot, build } = new AbilityBuilder<AppAbility>(
    createMongoAbility
  );

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

export type AppAbility = MongoAbility<[Actions, Subjects]>;
type Actions = "create" | "read" | "update" | "delete" | "manage";
type Subjects = "all" | "User" | "Article";
