import logoutIcon from "../assets/icons/logout.svg"
import accountIcon from "../assets/icons/accounticon.svg"
import logo128px from "../assets/logo128px.webp"

const BASE_URL = import.meta.env.BASE_URL

export default /*html*/`<div id="aurum">
    <img id="logo" src="${logo128px}">
    <h1 class="aurum-name">Aurum</h1>
</div>
<nav>
    <a href="${BASE_URL}">Home</a>
    <a id="financas" href="${BASE_URL}financas/">Finanças</a>
    <a href="${BASE_URL}sobre/">Sobre</a>
    <div id="buttons">
        <button id="entrar-button" onclick="window.location.href='${BASE_URL}entrar/'"><img src="${accountIcon}">Entrar</button>
        <button id="sair-button" class="button-secondary"><img src="${logoutIcon}">Sair</button>
    </div>
</nav>`