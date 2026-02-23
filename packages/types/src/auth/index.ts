import { SignupValidationError } from "./auth.error.js"
import { LoginData, SignupData } from "./auth.response.js"

export interface ApiError {
    success: false
    error: string
};

export interface ApiSuccess<T> {
    success: true
    data: T
}
//? auth Request
export * from "./auth.request.js";

//? auth Response
export * from "./auth.response.js"

//? auth Error
export * from "./auth.error.js"

//? master signup Response
export type SignupResponse =
    | ApiSuccess<SignupData>
    | SignupValidationError
    | ApiError
//? master login Response 
export type LoginResponse =
    | ApiSuccess<LoginData>
    | ApiError