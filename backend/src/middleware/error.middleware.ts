import { ZodError } from "zod";
import { type ErrorRequestHandler } from "express";
import { ApiError } from "utils/apiError";

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {

  if (err instanceof ZodError) {
    return res.status(400).json({
      success: false,
      error: err.issues?.[0]?.message ?? "Validation error",
    });
  }

  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      success: false,
      error: err.message,
      details: err.details
    });
  }

  return res.status(500).json({
    success: false,
    error: "Internal Server Error"
  });

};