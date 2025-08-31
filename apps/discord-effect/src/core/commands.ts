import { Effect } from "effect";
import * as S from "effect/Schema";
import { Logger } from "./services";

export const EchoInput = S.Struct({
  text: S.NonEmptyString,
});
export type EchoInput = S.Schema.Type<typeof EchoInput>;

export const echoCommand = (input: EchoInput) => {
  return Effect.gen(function* () {
    const log = yield* Logger;
    log.info("Handling /echo", input);
    return `You said: ${input.text}`;
  });
};
