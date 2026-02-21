import { ApiError } from "./index.js"

export interface ValidationErrorDetail {
    field: string
    message: string
}

export interface SignupValidationError extends ApiError {
    details: ValidationErrorDetail[]
}