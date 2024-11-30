import { bufferToString, decryptAES, encodeAESKey, encryptAES, stringToBuffer } from "../modules/crypto";
import { isLoggedIn } from "../modules/session";

if (!isLoggedIn()) {
    window.location.href = import.meta.env.BASE_URL;
}

const key = await encodeAESKey("senha");
const key2 = await encodeAESKey("senha2");
const data = stringToBuffer("oi");

const encrypted = new Uint8Array(await encryptAES(data, key));
console.log(bufferToString(encrypted));

const decrypted = new Uint8Array(await decryptAES(encrypted, key));
console.log(bufferToString(decrypted));

console.log(bufferToString(new Uint8Array(await decryptAES(encrypted, key2))));