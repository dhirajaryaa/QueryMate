import { AppError } from "@/lib/errors";
import { logger } from "@/lib/logger";
import { toast } from "sonner";

export const handleServerActionError = (error: unknown): never => {
  if (error instanceof AppError) {
    logger.warn(error);
    throw error;
  }
  logger.error(error);
  throw new AppError("internal:api");
};

export const handleClientError = (error: unknown) => {
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
  toast.error("Something went wrong!");
};
