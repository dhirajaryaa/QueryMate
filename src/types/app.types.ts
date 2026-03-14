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

export type AppErrorPayload = {
  code: ErrorCode;
  message: string;
  cause?: string;
};

export type AppResponse<T> =
  | { success: true; data: T }
  | { success: false; error: AppErrorPayload };
