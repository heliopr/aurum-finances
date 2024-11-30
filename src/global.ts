import { isLoggedIn, setIsLoggedIn } from "./modules/session.ts";
import headerHtml from "./components/header.ts";
import footerHtml from "./components/footer.ts";
import Swal from "sweetalert2";


const footer = document.querySelector("footer")!;
const header = document.querySelector("header")!;

header.innerHTML = headerHtml;
footer.innerHTML = footerHtml;


if (isLoggedIn()) {
    (<HTMLElement>header.querySelector("#entrar-button"))!.classList.add("hidden");
} else {
    (<HTMLElement>header.querySelector("#sair-button"))!.classList.add("hidden");
}


function sair() {
    Swal.fire({
        title: "Você tem certeza de que quer sair?",
        showDenyButton: true,
        buttonsStyling: false,
        confirmButtonText: "Sim",
        denyButtonText: "Não",
        customClass: {
            container: "dialog-button-gap",
            denyButton: "button-secondary"
        }
    }).then(result => {
        if (result.isConfirmed) {
            setIsLoggedIn(false);
            window.location.reload();
        }
    });
}

header.querySelector("#sair-button")!.addEventListener("click", sair);