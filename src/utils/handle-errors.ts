import { AppError } from "@/lib/errors";
import { logger } from "@/lib/logger";
import { ActionErrorResponse } from "@/types/app.types";
import { notFound, redirect } from "next/navigation";
import { AppErrorPayload } from "@/types/app.types";
import { toast } from "sonner";

export const handleServerActionError = (error: any): ActionErrorResponse => {
  if (error instanceof AppError) {
    logger.warn(error);
    return { success: false, error: error.toJson() };
  }
  logger.error(error);

  const err = new AppError("internal:api", error.message).toJson();
  return { success: false, error: err };
};

export function handlePageError(error: AppErrorPayload): never {
  switch (error.code) {
    case "unauthorized:auth":
      redirect("/login");

    case "not_found:chat":
      redirect("/new");

    case "not_found:api":
      notFound();

    default:
      notFound();
  }
}

export const handleClientError = (error: any): void => {
  if (error instanceof AppError) {
    if (process.env.NODE_ENV === "development") {
      console.error(error);
    } else {
      logger.warn(error);
    }

    toast.error(error.message);
    return;
  }

  logger.error(error);
  toast.error(error?.message || "Something went wrong!");
};
