"use client";

import { Button } from "@/components/ui/button"
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { LoginInput } from "@/types/auth.types";
import Link from "next/link"

export function LoginForm() {
     const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            // Handle form submission logic here
            const formData = new FormData(e.currentTarget);
    
            const loginData: LoginInput = {
                email: formData.get("email") as string,
                password: formData.get("password") as string,
            }
            console.log("Signup Data:", loginData);
    
            // Reset the form after submission
            e.currentTarget.reset();
        }
    return (
                <form onSubmit={handleSubmit}>
                    <FieldGroup>
                        <Field>
                            <FieldLabel htmlFor="email">Email</FieldLabel>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="m@example.com"
                                required
                            />
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
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                placeholder="abc@123"
                                required />
                        </Field>
                        <Field>
                            <Button type="submit">Login</Button>
                            <FieldDescription className="text-center">
                                Don&apos;t have an account? <Link href="/signup">Sign up</Link>
                            </FieldDescription>
                        </Field>
                    </FieldGroup>
                </form>
            
    )
}
