import { NodeContext, NodeRuntime } from "@effect/platform-node";
import { config } from "dotenv";
import { ConfigProvider, Effect, Layer } from "effect";
import { LoggerLive } from "@/core/services";
import { DiscordClientLive } from "@/discord/client";
import { bindGateway } from "@/discord/gateway";
import { registerCommands } from "@/discord/register-commands";

config();

const program = Effect.gen(function* () {
  yield* registerCommands;
  yield* bindGateway;

  yield* Effect.never;
});

const MainLive = DiscordClientLive.pipe(Layer.provideMerge(LoggerLive));

const runnable = Effect.withConfigProvider(
  Effect.provide(program, MainLive),
  ConfigProvider.fromEnv()
).pipe(Effect.provide(NodeContext.layer));

NodeRuntime.runMain(runnable);
