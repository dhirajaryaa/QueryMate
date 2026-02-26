import { User } from "./user.types";

export interface SignupInput {
    name?: string;
    email: string;
    password: string;
};

export interface LoginInput {
    email: string;
    password: string;
};

export interface AuthResponse {
    success: boolean;
    user?: User;
    error?: string;
}

