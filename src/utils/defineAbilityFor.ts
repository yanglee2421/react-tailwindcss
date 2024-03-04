// Acl Imports
import { createMongoAbility, AbilityBuilder } from "@casl/ability";
import type { MongoAbility } from "@casl/ability";

export function defineAbilityFor(role: string) {
  const aclBuilder = new AbilityBuilder<AppAbility>(createMongoAbility);

  switch (role) {
    case "owner":
      ruleForOwner(aclBuilder);
      break;
    case "admin":
      ruleForAdmin(aclBuilder);
      break;
    case "client":
      ruleForClient(aclBuilder);
      break;
    default:
      ruleForVisitor(aclBuilder);
  }

  return aclBuilder.build();
}

export type AppAbility = MongoAbility<[string, string]>;

function ruleForOwner(aclBuilder: AbilityBuilder<AppAbility>) {
  aclBuilder.can("manage", "all");
}

function ruleForAdmin(aclBuilder: AbilityBuilder<AppAbility>) {
  aclBuilder.can("manage", "all");
}

function ruleForClient(aclBuilder: AbilityBuilder<AppAbility>) {
  aclBuilder.can("read", "all");
}

function ruleForVisitor(aclBuilder: AbilityBuilder<AppAbility>) {
  aclBuilder.can("read", "all");
}
