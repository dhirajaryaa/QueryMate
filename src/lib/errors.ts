import { logger } from "./logger";

export type ErrorType =
  | "bad_request"
  | "unauthorized"
  | "forbidden"
  | "not_found"
  | "rate_limit"
  | "offline"
  | "internal";

export type Surface =
  | "chat"
  | "auth"
  | "api"
  | "stream"
  | "database"
  | "history";

export type ErrorCode = `${ErrorType}:${Surface}`;

// error throw class defined
export class ChatBotError extends Error {
  type: ErrorType;
  surface: Surface;
  statusCode: number;
  cause?: string;

  constructor(errorCode: ErrorCode, cause?: string) {
    const message = getMessageByErrorCode(errorCode);
    super(message);

    const [type, surface] = errorCode.split(":");

    this.type = type as ErrorType;
    this.surface = surface as Surface;
    this.statusCode = getStatusCodeByType(this.type);
    this.cause = cause;

    Error.captureStackTrace?.(this, ChatBotError);
  }

  toResponse() {
    const code: ErrorCode = `${this.type}:${this.surface}`;

    const payload = {
      code,
      message: this.message,
      cause: this.cause,
    };
    // smarter logging
    if (this.type === "internal") {
      logger.error(payload);
    } else {
      logger.warn(payload);
    }

    // return http response
    return Response.json(payload, { status: this.statusCode });
  }
};

export function getMessageByErrorCode(errorCode: ErrorCode): string {
  if (errorCode.includes("database")) {
    return "We couldn't complete your request due to a database issue. Please try again.";
  }

  switch (errorCode) {
    case "bad_request:api":
      return "The request could not be processed. Please check your input and try again.";

    case "unauthorized:auth":
      return "Please sign in to continue.";

    case "forbidden:auth":
      return "You don't have permission to access this feature.";

    case "rate_limit:chat":
      return "You've reached the message limit. Please try again later.";

    case "not_found:chat":
      return "This chat could not be found.";

    case "forbidden:chat":
      return "You don't have permission to access this chat.";

    case "unauthorized:chat":
      return "Please sign in to view this chat.";

    case "offline:chat":
      return "Message could not be sent. Please check your internet connection.";

    default:
      return "Something went wrong. Please try again.";
  }
}

function getStatusCodeByType(type: ErrorType) {
  switch (type) {
    case "bad_request":
      return 400;
    case "unauthorized":
      return 401;
    case "forbidden":
      return 403;
    case "not_found":
      return 404;
    case "rate_limit":
      return 429;
    case "offline":
      return 503;
    default:
      return 500;
  }
}
