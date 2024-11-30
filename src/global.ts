import { isLoggedIn } from "./modules/session.ts";
import headerHtml from "./components/header.ts";
import footerHtml from "./components/footer.ts";


const footer = document.querySelector("footer")!;
const header = document.querySelector("header")!;

header.innerHTML = headerHtml;
footer.innerHTML = footerHtml;


if (isLoggedIn()) {
    (<HTMLElement>header.querySelector("#entrar-button"))!.classList.add("hidden")
} else {
    (<HTMLElement>header.querySelector("#sair-button"))!.classList.add("hidden")
}