import { Context, Layer } from "effect";

export class Logger extends Context.Tag("Logger")<
  Logger,
  {
    info: (msg: string, meta?: unknown) => void;
    warn: (msg: string, meta?: unknown) => void;
    error: (msg: string, meta?: unknown) => void;
  }
>() {}

export const LoggerLive = Layer.succeed(Logger, {
  info: (msg, meta) => console.log("[INFO]", msg, meta),
  warn: (msg, meta) => console.log("[WARN]", msg, meta),
  error: (msg, meta) => console.log("[ERROR]", msg, meta),
});
