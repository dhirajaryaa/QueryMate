import { asyncHandler } from "utils/asyncHandler";
import { Request, RequestHandler, Response } from "express";
import { SignupResponse } from "@QueryMate/types";
import { signupSchema } from "./auth.schema";
import { z } from 'zod'
import { mapZodError } from "utils/zodErrorMapper";
import { ApiError } from "utils/apiError";
import { signupService } from "./auth.services";

export const signupController: RequestHandler = asyncHandler(async (req: Request, res: Response<SignupResponse>) => {
    // check req body 
    const body = signupSchema.safeParse(req.body);

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
})