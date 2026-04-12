import crypto from "node:crypto";

const ALGO = "aes-256-cbc";
const MASTER_KEY = process.env.MASTER_KEY!;

const deriveKey = (userId: string) => {
    return crypto
        .createHash("sha256")
        .update(`${MASTER_KEY.trim()}:${userId}`)
        .digest(); //32bit
};

export function encrypt(text: string, userId: string) {
    const iv = crypto.randomBytes(16);
    const key = deriveKey(userId);

    const cipher = crypto.createCipheriv(ALGO, key, iv);

    let secret = cipher.update(text, "utf8");
    secret = Buffer.concat([secret, cipher.final()])

    return `${iv.toString("hex")}:${secret.toString("hex")}`
};

export function decrypt(text: string, userId: string) {
        const [ivHex, encryptedHex] = text.split(":");
        
        const iv = Buffer.from(ivHex, "hex");
        const encryptedText = Buffer.from(encryptedHex, "hex");

        const key = deriveKey(userId);

        const decipher = crypto.createDecipheriv(ALGO, key, iv);

        let decrypted = decipher.update(encryptedText);
        decrypted = Buffer.concat([decrypted, decipher.final()]);        

        return decrypted.toString("utf8");
}