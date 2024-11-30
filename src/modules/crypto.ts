function getCounter(): Uint8Array {
    const counter = new Uint8Array(16);
    counter.fill(0);
    return counter;
}

export function stringToBuffer(str: string) {
    return new TextEncoder().encode(str);
}

export function bufferToString(buffer: BufferSource) {
    return new TextDecoder().decode(buffer);
}

// Credits: https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/digest#converting_a_digest_to_a_hex_string
export async function sha512(message: string) {
    const msgUint8 = stringToBuffer(message);
    const hashBuffer = await window.crypto.subtle.digest("SHA-512", msgUint8);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("");
    return hashHex;
}

export async function sha256Buffer(message: string) {
    const msgUint8 = stringToBuffer(message);
    const hashBuffer = await window.crypto.subtle.digest("SHA-256", msgUint8);
    return hashBuffer;
}

export async function encodeAESKey(hash: BufferSource) {
    return window.crypto.subtle.importKey(
        "raw",
        hash,
        "AES-CTR",
        false,
        ["encrypt", "decrypt"],
    );
}

// https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/encrypt#examples
export function encryptAES(data: Uint8Array, encodedKey: CryptoKey) {
    return window.crypto.subtle.encrypt(
        {
            name: "AES-CTR",
            counter: getCounter(),
            length: 64,
        },
        encodedKey,
        data,
    );
}

export function decryptAES(encryptedData: Uint8Array, encodedKey: CryptoKey) {
    return window.crypto.subtle.decrypt(
        {
            name: "AES-CTR",
            counter: getCounter(),
            length: 64
        },
        encodedKey,
        encryptedData,
    );
}