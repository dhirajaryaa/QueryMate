"use client";

import { Button } from "@/components/ui/button";
import {
    Field,
    FieldDescription,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { redirect } from "next/navigation";
import { toast } from "sonner";
import PasswordField from "./password-field";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignupSchema } from "@/schema/auth.schema";
import z from "zod";

type SignupInput = z.infer<typeof SignupSchema>;

export function SignupForm() {
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<SignupInput>({
        mode: "onBlur",
        resolver: zodResolver(SignupSchema),
    });

    const handleFormSubmit = async (payload: SignupInput) => {
        setIsLoading(true);
        const { data, error } = await authClient.signUp.email(payload, {
            onSuccess: () => {
                toast.success("Account created successfully");
                reset();
                redirect("/dashboard");
            },
            onError: (ctx) => {
                toast.error(
                    ctx.error?.message ||
                    "Failed to create account. Please try again."
                );
            }
        })
        setIsLoading(false);
    }

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)}>
            <FieldGroup>
                <Field>
                    <FieldLabel htmlFor="name">Full Name</FieldLabel>
                    <Input
                        {...register("name")}
                        placeholder="John Doe"
                        aria-invalid={errors.name ? "true" : "false"}
                    />
                    <FieldError>
                        {errors.name?.message}
                    </FieldError>
                </Field>
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
                    <FieldLabel htmlFor="password">Password</FieldLabel>
                    <PasswordField register={register} error={errors.password} />
                    {errors.password ?
                        <FieldError className="text-xs">
                            {errors.password?.message}
                        </FieldError> :
                        <FieldDescription className="text-xs">
                            Password must be at least 8 characters and include letter, number, and special character
                        </FieldDescription>
                    }
                </Field>
                <FieldGroup>
                    <Field>
                        <Button type="submit" disabled={isLoading}>
                            {isLoading ?
                                <Loader2 className="animate-spin size-7" /> : "Create Account"}
                        </Button>
                        <FieldDescription className="px-6 text-center">
                            Already have an account? <Link href="/login">Login</Link>
                        </FieldDescription>
                    </Field>
                </FieldGroup>
            </FieldGroup>
        </form>
    )
}
