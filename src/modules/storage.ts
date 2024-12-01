import { bufferToString, decryptAES, encodeAESKey, encryptAES, sha256Buffer, stringToBuffer } from "./crypto";
import { TransactionData } from "./transactions";

export interface Data {
    settings: {};
    lastTransactionIndex: number;
    transactions: TransactionData[];
}

export function encodeBuffer(buffer: Uint8Array) {
    //return JSON.stringify(Array.from(buffer));
    let binary = '';
    for (let i = 0; i < buffer.length; i++) {
        binary += String.fromCharCode(buffer[i]);
    }
    return btoa(binary);
}

export function decodeBuffer(str: string) {
    //return new Uint8Array(JSON.parse(str));
    const binary = atob(str);
    const uint8Array = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
        uint8Array[i] = binary.charCodeAt(i);
    }
    return uint8Array;
}

export function saveKey(hash: Uint8Array) {
    localStorage.setItem("cryptokey", encodeBuffer(hash));
}

export function getKey() {
    return decodeBuffer(localStorage.getItem("cryptokey")!);
}

export async function encryptData() {
    const data = localStorage.getItem("data");
    if (!data) return;
    const cryptoKey = getKey();
    const encodedKey = await encodeAESKey(cryptoKey);

    const encryptedData = new Uint8Array(await encryptAES(stringToBuffer(data), encodedKey));
    localStorage.setItem("data", encodeBuffer(encryptedData));
    localStorage.removeItem("cryptokey");
}

export async function decryptData(password: string) {
    const data = localStorage.getItem("data");
    if (!data) return;
    const cryptoKey = new Uint8Array(await sha256Buffer(password));
    saveKey(cryptoKey);
    const encodedKey = await encodeAESKey(cryptoKey);

    const decryptedData = new Uint8Array(await decryptAES(decodeBuffer(data), encodedKey));
    localStorage.setItem("data", bufferToString(decryptedData));
}


export function saveData(newData: any) {
    localStorage.setItem("data", JSON.stringify(newData));
}

export function getData() {
    const dataString = localStorage.getItem("data");
    if (!dataString) return defaultData();
    return JSON.parse(dataString);
}

export function defaultData(): Data {
    return {
        settings: {},
        lastTransactionIndex: 0,
        transactions: [],
    }
}