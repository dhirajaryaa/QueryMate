"use client";

import { useState } from "react";
import { Input } from "../ui/input";
import { Eye, EyeOff } from "lucide-react";
import { FieldError } from "../ui/field";
import { UseFormRegister, FieldError as RHFError } from "react-hook-form";
import { SignupInput } from "@/types/auth.types";

type Props = {
    register: UseFormRegister<SignupInput>;
    error?: RHFError;
};
export default function PasswordField({ register, error }: Props) {
    const [showPassword, setShowPassword] = useState(false);
    return (
        <div className="flex items-center gap-2 relative">
            <Input
                {...register("password")}
                type={showPassword ? "text" : "password"}
                placeholder="abc@123"
                className="relative w-full pr-10"
                aria-invalid={error ? "true" : "false"}
            />
            

            <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-2 top-1/2 -translate-y-1/2"
            >
                {showPassword ? <EyeOff /> : <Eye />}
            </button>
        </div>
    )
}

