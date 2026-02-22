import bcrypt from "bcryptjs";

export const generateHashPassword = async (password: string): Promise<string | undefined> => {
    if (!password) return;
    return await bcrypt.hash(password, 12)
}   