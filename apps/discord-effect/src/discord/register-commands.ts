// discord/registerCommands.ts

import { REST, Routes } from "discord.js";
import { Effect } from "effect";
import { BotConfig } from "@/core/config";
import { Logger } from "@/core/services";

// Define commands for Discord API
const commands = [
  {
    name: "echo",
    description: "Echo back your text",
    options: [
      {
        type: 3,
        name: "text",
        description: "What to echo",
        required: true,
      },
    ],
  },
];

export const registerCommands = Effect.gen(function* () {
  const { DISCORD_APP_ID, DISCORD_GUILD_ID, DISCORD_TOKEN } = yield* BotConfig;
  const log = yield* Logger;

  const rest = new REST({ version: "10" }).setToken(DISCORD_TOKEN);

  if (DISCORD_GUILD_ID) {
    // guild-scoped (fast propagate; great for dev)
    yield* Effect.tryPromise({
      try: () =>
        rest.put(
          Routes.applicationGuildCommands(DISCORD_APP_ID, DISCORD_GUILD_ID),
          { body: commands }
        ),
      catch: (e) => e as Error,
    });
    log.info("Registered guild commands");
  } else {
    // global (can take up to ~1 hour to roll out)
    yield* Effect.tryPromise({
      try: () =>
        rest.put(Routes.applicationCommands(DISCORD_APP_ID), {
          body: commands,
        }),
      catch: (e) => e as Error,
    });
    log.info("Registered global commands");
  }
});
