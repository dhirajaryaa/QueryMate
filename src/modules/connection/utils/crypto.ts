import crypto from "crypto";

const ALGORITHM = "aes-256-cbc";

// IMPORTANT: store this in env (.env)
const SECRET_KEY = crypto
    .createHash("sha256")
    .update(process.env.MASTER_KEY || "default_secret")
    .digest(); // 32 bytes

const IV_LENGTH = 16; // AES block size

// 🔐 Encrypt
export function encrypt(text: string): string {
    const iv = crypto.randomBytes(IV_LENGTH);

    const cipher = crypto.createCipheriv(ALGORITHM, SECRET_KEY, iv);

    let encrypted = cipher.update(text, "utf8", "hex");
    encrypted += cipher.final("hex");

    return iv.toString("hex") + ":" + encrypted;
}

// 🔓 Decrypt
export function decrypt(encryptedText: string): string {
    const [ivHex, encrypted] = encryptedText.split(":");

    const iv = Buffer.from(ivHex, "hex");

    const decipher = crypto.createDecipheriv(ALGORITHM, SECRET_KEY, iv);

    let decrypted = decipher.update(encrypted, "hex", "utf8");
    decrypted += decipher.final("utf8");

    return decrypted;
}