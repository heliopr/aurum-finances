import { isLoggedIn } from "./modules/session.ts";

import headerRaw from "./components/header.html?raw";
import footerRaw from "./components/footer.html?raw";

function loadEnv(str: string): string {
    return str.replace(new RegExp("%BASE_URL%", "g"), import.meta.env.BASE_URL);
}

const footer = document.querySelector("footer")!;
const header = document.querySelector("header")!;

header.innerHTML = loadEnv(headerRaw);
footer.innerHTML = loadEnv(footerRaw);


if (isLoggedIn()) {
    (<HTMLElement>header.querySelector("#entrar-button"))!.classList.add("hidden")
} else {
    (<HTMLElement>header.querySelector("#sair-button"))!.classList.add("hidden")
}