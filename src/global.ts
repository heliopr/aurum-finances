import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { isLoggedIn, setIsLoggedIn } from "./modules/session.ts";
import headerHtml from "./components/header.ts";
import footerHtml from "./components/footer.ts";
import { confirmDialog } from "./modules/dialogs.ts";
import { encryptData } from "./modules/storage.ts";


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
    e.classList.add("disabled");
}


function sair() {
    confirmDialog("Você tem certeza de que quer sair?").then(async (result) => {
        if (result.isConfirmed) {
            setIsLoggedIn(false);
            await encryptData();
            window.location.href = import.meta.env.BASE_URL;
        }
    });
}


header.querySelector("#sair-button")!.addEventListener("click", sair);


gsap.registerPlugin(ScrollTrigger);


gsap.from('#title', {
    opacity: 0,
    y: 65,
    duration: 1.25,
    ease: 'power2.out'
});


gsap.from('#description', {
    opacity: 0,
    y: 60,
    duration: 1.25,
    delay: 0.4,
    ease: 'power2.out'
});


gsap.from('#logo', {
    opacity: 0,
    y: 65,
    duration: 1.25,
    delay: 0.4,
    ease: 'power2.out'
});


gsap.utils.toArray('.course-image').forEach(image => {
    gsap.from(image as HTMLElement, {
        scrollTrigger: {
            trigger: image as HTMLElement,
            start: "top 80%",
        },
        opacity: 0,
        y: 60,
        duration: 0.85
    });
});


gsap.utils.toArray('.card').forEach(card => {
    gsap.from(card as HTMLElement, {
        scrollTrigger: {
            trigger: card as HTMLElement,
            start: "top 80%",
        },
        opacity: 0,
        y: 60,
        duration: 0.85
    });
});