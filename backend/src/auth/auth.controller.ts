import { asyncHandler } from "utils/asyncHandler";
import { Request, RequestHandler, Response } from "express";
import { LoginResponse, SignupResponse } from "@QueryMate/types";
import { authSchema } from "./auth.schema";
import { mapZodError } from "utils/zodErrorMapper";
import { ApiError } from "utils/apiError";
import { loginService, signupService } from "./auth.services";

// signup controller 
export const signupController: RequestHandler = asyncHandler(async (req: Request, res: Response<SignupResponse>) => {
    // check req body 
    const body = authSchema.safeParse(req.body);

    if (!body.success) {
        const details = mapZodError(body.error);
        throw new ApiError(400, "validation Error", details)
    };

    const response = await signupService(body.data);

    // sign token on headers
    res.cookie("token", response.accessToken);
    res.cookie("refreshToken", response.refreshToken);

    return res.status(201).json({
        success: true,
        data: {
            token: response.accessToken,
            user: response.user
        }
    })
});

// login controller 
export const loginController: RequestHandler = asyncHandler(async (req: Request, res: Response<LoginResponse>) => {
    // check req body 
    const body = authSchema.safeParse(req.body);

    if (!body.success) {
        const details = mapZodError(body.error);
        throw new ApiError(400, "validation Error", details)
    };

    const response = await loginService(body.data);

    // sign token on headers
    res.cookie("token", response.accessToken);
    res.cookie("refreshToken", response.refreshToken);

    return res.status(200).json({
        success: true,
        data: {
            token: response.accessToken,
            user: response.user
        }
    })
});