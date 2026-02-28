import z from "zod";

export const LoginSchema = z.object({
    email: z.email({ error: "invalid email address" }),
    password: z.string().regex(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        {
            message:
                "Password must be at least 8 characters and include letter, number, and special character",
        }
    )
});
export const SignupSchema = LoginSchema.extend({
    name: z.string().min(3, "name name must be at least 3 characters").max(80, "name must be less then 80 characters"),

});