import { SignupValidationError } from "./auth.error.js"
import { SignupData } from "./auth.response.js"

export interface ApiError {
    success: false
    error: string
};

export interface ApiSuccess<T> {
    success: true
    data: T
}
//? signup Request
export * from "./auth.request.js";

//? signup Response
export * from "./auth.response.js"

//? signup Error
export * from "./auth.error.js"

//? master signup Response
export type SignupResponse =
    | ApiSuccess<SignupData>
    | SignupValidationError
    | ApiError