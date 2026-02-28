import z from "zod";
import { User } from "./user.types";
import { SignupSchema } from "@/schema/auth.schema";

export type SignupInput = z.infer<typeof SignupSchema>

export interface LoginInput {
    email: string;
    password: string;
};

export interface AuthSuccussResponse {
    success: boolean;
    user?: User;
}

export interface AuthErrorResponse {
    success: boolean;
    error: string;
    details?: {
        field: string;
        message: string;
    }[]
};

export type AuthResponse = AuthErrorResponse | AuthSuccussResponse

export interface JwtPayload {
    id: string;
    token: string
};