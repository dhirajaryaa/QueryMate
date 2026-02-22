import { ValidationErrorDetail } from "@QueryMate/types"

export class ApiError extends Error {

    statusCode: number;
    details?: ValidationErrorDetail[];
    constructor(statusCode: number, message: string, details?: ValidationErrorDetail[]) {

        super(message);
        this.statusCode = statusCode;
        if (details !== undefined && details.length > 0) {
            this.details = details;
        }
        Error.captureStackTrace(this, this.constructor);

    }
}