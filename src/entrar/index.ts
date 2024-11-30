import { checkPassword, getStoredHash, storePassword } from "../modules/password";
import { setIsLoggedIn } from "../modules/session";
import { hideAll } from "../modules/util";
import { errorDialog, successDialog } from "../modules/dialogs";
import { decryptData, defaultData, saveData, saveKey } from "../modules/storage";
import { sha256Buffer } from "../modules/crypto";

const main = document.querySelector("main")!;
const senhaInput = <HTMLInputElement>main.querySelector("#senha-input")!;
const entrarButton = main.querySelector("#entrar-button");
const criarButton = main.querySelector("#criar-button");

async function entrar() {
    const senha = senhaInput.value;
    if (await checkPassword(senha)) {
        setIsLoggedIn(true);
        await decryptData(senha);

        await successDialog("Logado com sucesso!");
        window.location.href = import.meta.env.BASE_URL;
    } else {
        await errorDialog("Senha inválida!");
        senhaInput.value = "";
    }
}

async function criarSenha() {
    const senha = senhaInput.value;
    await storePassword(senha);
    setIsLoggedIn(true);

    saveData(defaultData());
    saveKey(new Uint8Array(await sha256Buffer(senha)));

    await successDialog("Senha criada com sucesso!");
    window.location.href = import.meta.env.BASE_URL;
}

if (getStoredHash() === null) {
    hideAll(main.querySelectorAll(".hasPassword"));
} else {
    hideAll(main.querySelectorAll(".noPassword"));
}


entrarButton?.addEventListener("click", entrar);
criarButton?.addEventListener("click", criarSenha);