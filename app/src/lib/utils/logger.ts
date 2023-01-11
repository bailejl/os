import pino from "pino";

const logger = pino({
  name: "app",
  level: "debug"
});

export function info(message: string, ...meta: any[]) {
  logger.info(message, meta);
}
