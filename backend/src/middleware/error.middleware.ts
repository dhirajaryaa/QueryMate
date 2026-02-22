import { type ErrorRequestHandler } from "express";
import { ApiError } from "utils/apiError";

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {

  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      success: false,
      error: err.message,
      ...err
    });
  }

  return res.status(500).json({
    success: false,
    error: "Internal Server Error"
  });

};