import type { Effect } from "effect";
import * as S from "effect/Schema";
import { EchoInput, echoCommand } from "./commands";
import type { Logger } from "./services";

export type CommandHandler = (
  options: Record<string, unknown>
) => Effect.Effect<string, unknown, Logger>;

export const commandRouter: Record<string, CommandHandler> = {
  echo: (opts) => {
    const input = S.decodeUnknownSync(EchoInput)({
      text: String(opts.text ?? ""),
    });
    return echoCommand(input);
  },
};
