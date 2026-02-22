import { SignupRequest } from "@QueryMate/types";
import { db } from "db";
import { auth } from "db/schema/auth.schema";
import { session } from "db/schema/session.schema";
import { eq } from "drizzle-orm";
import { generateAccessAndRefreshToken } from "lib/generateToken";
import { generateHashPassword } from "lib/passwordHash";
import { ApiError } from "utils/apiError";

export const signupService = async ({ email, password }: SignupRequest) => {
    // 1. check email already registered or not 
    const emailExist = await db.select().from(auth).where(eq(auth.email, email)).limit(1)
  if (emailExist.length > 0) {
    throw new ApiError(400, "Email already exists");
  }
    // 2. password hashing
    const passwordHash = await generateHashPassword(password);

    // 3. credentials save in auth table
    const [newUser] = await db.insert(auth).values({
        email,
        password: passwordHash,
        provider: 'email'
    }).returning({ id: auth.id, email: auth.email, provider: auth.provider });
    if (!newUser) {
        throw new ApiError(500, "internal system error")
    };

    // 4. token generate 
    const { accessToken, refreshToken } = await generateAccessAndRefreshToken({ id: newUser.id, email: newUser.email });

    // 5. token save session table
    await db.insert(session).values({
        refreshToken,
        userId: newUser.id
    });

    // 6. return response
    return { user: newUser, accessToken, refreshToken }
}