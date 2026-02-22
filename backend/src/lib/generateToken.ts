import { QM_ACCESS_TOKEN_SECRET, QM_REFRESH_TOKEN_SECRET } from 'config/env'
import { SignJWT } from 'jose'

export const generateAccessAndRefreshToken = async ({ id, email }: { id: string, email: string }) => {

    const accessSecret = new TextEncoder().encode(QM_ACCESS_TOKEN_SECRET);
    const refreshSecret = new TextEncoder().encode(QM_REFRESH_TOKEN_SECRET);

    const accessToken = await new SignJWT({ id, email })
        .setProtectedHeader({ alg: "HS256" })
        .setExpirationTime("1d")
        .sign(accessSecret);

    const refreshToken = await new SignJWT({ id })
        .setProtectedHeader({ alg: 'HS256' })
        .setExpirationTime("7d")
        .sign(refreshSecret)

    return { accessToken, refreshToken }
}