// Acl Imports
import { AbilityBuilder, createMongoAbility } from "@casl/ability";

export function defineAbilityFor() {
  const { can, build } = new AbilityBuilder(createMongoAbility);

  return build();
}
