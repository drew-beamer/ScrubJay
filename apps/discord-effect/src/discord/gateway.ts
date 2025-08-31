// discord/gateway.ts

import {
  ApplicationCommandOptionType,
  InteractionType,
  MessageFlags,
} from "discord.js";
import { Effect } from "effect";
import { commandRouter } from "@/core/command-router";
import { Logger } from "@/core/services";
import { DiscordClient } from "./client";

export const bindGateway = Effect.gen(function* () {
  const { client } = yield* DiscordClient;
  const log = yield* Logger;

  client.on("interactionCreate", async (interaction) => {
    if (interaction.type !== InteractionType.ApplicationCommand) return;
    if (!interaction.isChatInputCommand()) return;
    const chat = interaction;
    const name = chat.commandName;

    const handler = commandRouter[name];
    if (!handler) {
      await chat.reply({
        content: "Unknown command",
        flags: [MessageFlags.Ephemeral],
      });
      return;
    }

    // Extract options into a plain object
    const options: Record<string, unknown> = {};
    for (const opt of chat.options.data) {
      if (opt.type === ApplicationCommandOptionType.Subcommand && opt.options) {
        for (const sub of opt.options) options[sub.name] = sub.value;
      } else {
        options[opt.name] = opt.value;
      }
    }

    // Run the Effect, catch errors -> reply nicely
    await Effect.runPromise(
      handler(options).pipe(
        Effect.provideService(Logger, log),
        Effect.tapBoth({
          onFailure: (e) => Effect.sync(() => log.error("Command failed", e)),
          onSuccess: () => Effect.sync(() => log.info("Command ok", { name })),
        }),
        Effect.matchEffect({
          onFailure: (e) =>
            Effect.promise(() =>
              chat.reply({
                content: `Error: ${String(e)}`,
                flags: [MessageFlags.Ephemeral],
              })
            ),
          onSuccess: (msg) =>
            Effect.promise(() => chat.reply({ content: msg })),
        })
      )
    );
  });

  log.info("Gateway bound");
});
