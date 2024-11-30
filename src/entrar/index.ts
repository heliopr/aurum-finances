import { checkPassword, getStoredHash, storePassword } from "../modules/password";
import { setIsLoggedIn } from "../modules/session";
import { hideAll } from "../modules/util";

const main = document.querySelector("main")!;
const senhaInput = <HTMLInputElement>main.querySelector("#senha-input")!;
const entrarButton = main.querySelector("#entrar-button");
const criarButton = main.querySelector("#criar-button");

async function entrar() {
    const senha = senhaInput.value;
    if (await checkPassword(senha)) {
        alert("Logado com sucesso!");
        setIsLoggedIn(true);
        window.location.href = import.meta.env.BASE_URL;
    } else {
        alert("Senha incorreta!");
        senhaInput.value = "";
    }
}

async function criarSenha() {
    const senha = senhaInput.value;
    await storePassword(senha);
    setIsLoggedIn(true);
    window.location.href = import.meta.env.BASE_URL;
}

if (getStoredHash() === null) {
    hideAll(main.querySelectorAll(".hasPassword"));
} else {
    hideAll(main.querySelectorAll(".noPassword"));
}


entrarButton?.addEventListener("click", entrar);
criarButton?.addEventListener("click", criarSenha);