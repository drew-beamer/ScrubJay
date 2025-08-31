import { Config } from "effect";
import * as Schema from "effect/Schema";

export const BotConfig = Config.all({
  NODE_ENV: Schema.Config(
    "NODE_ENV",
    Schema.Literal("development", "test", "production")
  ),
  DISCORD_TOKEN: Schema.Config("DISCORD_TOKEN", Schema.NonEmptyString),
  DISCORD_APP_ID: Schema.Config("DISCORD_APP_ID", Schema.NonEmptyString),
  DISCORD_GUILD_ID: Schema.Config("DISCORD_GUILD_ID", Schema.String),
  EBIRD_BASE_URL: Schema.Config("EBIRD_BASE_URL", Schema.NonEmptyString).pipe(
    Config.withDefault("https://api.ebird.org/")
  ),
  REACTION_THRESHOLD: Schema.Config(
    "REACTION_THRESHOLD",
    Schema.NumberFromString.pipe(Schema.greaterThan(0))
  ).pipe(Config.withDefault(3)),
});
