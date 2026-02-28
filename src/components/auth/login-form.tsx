"use client";

import { Button } from "@/components/ui/button"
import {
    Field,
    FieldDescription,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { LoginSchema } from "@/schema/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import Link from "next/link"
import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import PasswordField from "./password-field";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { redirect } from "next/navigation";

type LoginInput = z.infer<typeof LoginSchema>;

export function LoginForm() {
    const [isLoading, setIsLoading] = useState(false);

    const { register, handleSubmit, reset, formState: { errors } } = useForm<LoginInput>({
        mode: "onBlur",
        resolver: zodResolver(LoginSchema),
    });

    const handleFormSubmit = async (payload: LoginInput) => {
        setIsLoading(true);
        const { data, error } = await authClient.signIn.email(payload, {
            onSuccess: () => {
                reset();
                toast.success("Logged in successfully");
                redirect("/dashboard");
            },
            onError: (ctx) => {
                toast.error(
                    ctx.error?.message ||
                    "Failed to login. Please check your credentials and try again."
                );
            }
        })

        setIsLoading(false);

    }


    return (
        <form onSubmit={handleSubmit(handleFormSubmit)}>
            <FieldGroup>
                <Field>
                    <FieldLabel htmlFor="email">Email</FieldLabel>
                    <Input
                        type="email"
                        {...register("email")}
                        placeholder="m@example.com"
                        aria-invalid={errors.email ? "true" : "false"}
                    />
                    <FieldError>
                        {errors.email?.message}
                    </FieldError>
                </Field>
                <Field>
                    <div className="flex items-center">
                        <FieldLabel htmlFor="password">Password</FieldLabel>
                        <Link
                            href={"/forgot-password"}
                            className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                        >
                            Forgot your password?
                        </Link>
                    </div>
                    <PasswordField
                        register={register}
                        error={errors.password}
                    />
                    {errors.password ?
                        <FieldError className="text-xs">
                            {errors.password?.message}
                        </FieldError> :
                        <FieldDescription className="text-xs">
                            Password must be at least 8 characters and include letter, number, and special character
                        </FieldDescription>
                    }
                </Field>
                <Field>
                    <Button type="submit" disabled={isLoading}>
                        {isLoading ?
                            <Loader2 className="animate-spin size-7" /> : "Login"}
                    </Button>
                    <FieldDescription className="text-center">
                        Don&apos;t have an account? <Link href="/signup">Sign up</Link>
                    </FieldDescription>
                </Field>
            </FieldGroup>
        </form>

    )
}
