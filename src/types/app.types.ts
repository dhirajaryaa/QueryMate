import { reportSchema } from "@/schema/report.schema";
import z from "zod";

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

export type ActionErrorResponse = { success: false; error: AppErrorPayload };

export type AppResponse<T> = { success: true; data: T } | ActionErrorResponse;

// export type ReportFormValues = z.infer<typeof reportSchema>;
export type ReportPayload = z.infer<typeof reportSchema> & {
  submittedOn: string | Date;
};
