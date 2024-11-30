import { isLoggedIn, setIsLoggedIn } from "./modules/session.ts";
import headerHtml from "./components/header.ts";
import footerHtml from "./components/footer.ts";
import { confirmDialog } from "./modules/dialogs.ts";


const footer = document.querySelector("footer")!;
const header = document.querySelector("header")!;

header.innerHTML = headerHtml;
footer.innerHTML = footerHtml;


if (isLoggedIn()) {
    header.querySelector("#entrar-button")!.classList.add("hidden");
} else {
    header.querySelector("#sair-button")!.classList.add("hidden");
    const e = (<HTMLAnchorElement>header.querySelector("#financas"))!;
    e.removeAttribute("href");
    e.classList.add("disabled")
}


function sair() {
    confirmDialog("Você tem certeza de que quer sair?").then(result => {
        if (result.isConfirmed) {
            setIsLoggedIn(false);
            window.location.reload();
        }
    });
}

header.querySelector("#sair-button")!.addEventListener("click", sair);