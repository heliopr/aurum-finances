import walletIcon from "../assets/icons/walletgrad.svg";
import filelistIcon from "../assets/icons/filelistgrad.svg";
import settingsIcon from "../assets/icons/settingsgrad.svg";
import { isLoggedIn } from "../modules/session";

const main = document.querySelector("main")!;
const navigation = main.querySelector("#navigation");

const BASE_URL = import.meta.env.BASE_URL;

if (!isLoggedIn()) {
    window.location.href = import.meta.env.BASE_URL;
}

if (navigation) navigation.innerHTML = /*html*/`
    <div id="tabs">
        <a href="${BASE_URL}financas/" id="financas-tab"><img src="${walletIcon}">Geral</a>
        <a href="${BASE_URL}financas/transacoes/" id="transacoes-tab"><img src="${filelistIcon}">Transações</a>
        <a href="${BASE_URL}financas/opcoes/" id="opcoes-tab"><img src="${settingsIcon}">Opções</a>
    </div>
    <hr>
`;

const path = window.location.href.split("/");
const current = path[path.length - 2];
navigation?.querySelector(`#${current}-tab`)?.classList.add("current");