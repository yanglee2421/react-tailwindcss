// Acl Imports
import {
  MongoAbility,
  createMongoAbility,
  AbilityBuilder,
} from "@casl/ability";

export function defineAbilityFor(role: string) {
  const builder = new AbilityBuilder<AppAbility>(createMongoAbility);

  switch (role) {
    case "owner":
      ruleForOwner(builder);
      break;
    case "admin":
      ruleForAdmin(builder);
      break;
    case "client":
      ruleForClient(builder);
      break;
    default:
      ruleForVisitor(builder);
  }

  return builder.build();
}

export type AppAbility = MongoAbility<[Actions, string]>;
type Actions = "create" | "read" | "update" | "delete" | "manage";

function ruleForOwner(rule: AbilityBuilder<AppAbility>) {
  rule.can("manage", "all");
}

function ruleForAdmin(rule: AbilityBuilder<AppAbility>) {
  rule.can("manage", "all");
}

function ruleForClient(rule: AbilityBuilder<AppAbility>) {
  rule.can("read", "all");
}

function ruleForVisitor(rule: AbilityBuilder<AppAbility>) {
  rule.cannot("manage", "all");
}
