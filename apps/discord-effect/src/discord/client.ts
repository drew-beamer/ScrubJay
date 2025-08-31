import { Client, GatewayIntentBits, Partials } from "discord.js";
import { Context, Effect, Layer } from "effect";
import { BotConfig } from "@/core/config";
import { Logger } from "@/core/services";

export class DiscordClient extends Context.Tag("DiscordClient")<
  DiscordClient,
  { client: Client }
>() {}

export const DiscordClientLive = Layer.scoped(
  DiscordClient,
  Effect.gen(function* () {
    const { DISCORD_TOKEN } = yield* BotConfig;
    const log = yield* Logger;

    const client = new Client({
      intents: [GatewayIntentBits.Guilds],
      partials: [Partials.Channel],
    });

    yield* Effect.acquireRelease(
      Effect.async<void, Error>((resume) => {
        const onReady = () => {
          log.info(`Logged in as ${client.user?.tag}`);
          resume(Effect.succeed(undefined));
        };
        const onLoginError = (e: unknown) => {
          resume(Effect.fail(e instanceof Error ? e : new Error(String(e))));
        };
        client.once("clientReady", onReady);
        client.login(DISCORD_TOKEN).catch(onLoginError);

        return Effect.sync(() => {
          client.off("clientReady", onReady);
        });
      }),
      () => Effect.sync(() => client.destroy())
    );

    return { client };
  })
);
