import { sha512 } from "./crypto.ts";

export function hashPassword(password: string) {
    return sha512(password);
}

export function getStoredHash(): string | null {
    return localStorage.getItem("hashedPassword");
}

export async function storePassword(newPassword: string) {
    const hashed = await hashPassword(newPassword);
    localStorage.setItem("hashedPassword", hashed);
}