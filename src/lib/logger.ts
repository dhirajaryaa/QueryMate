import pino from "pino";

const isDev = process.env.NODE_ENV !== "production";

export const logger = pino({
  level: process.env.LOG_LEVEL || "info",
  transport: {
    targets: isDev
      ? [
          {
            target: "pino-pretty",
            options: {
              colorize: true,
              translateTime: "SYS:standard",
            },
          }
        ]
      : [
          {
            target: "pino/file",
            options: {
              destination: "./logs/app.log",
              mkdir: true,
            },
          },
        ],
  },

  timestamp: pino.stdTimeFunctions.isoTime,

  base: {
    service: "querymate",
  },
});
