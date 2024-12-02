import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";
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


document.querySelectorAll(".section-image").forEach((image) => {
    gsap.from(image, {
        scrollTrigger: {
            trigger: image,
            start: "top 80%",
            markers: false,  
        },
        opacity: 0,
        y: 60,
        duration: 0.85
    });
});


document.querySelectorAll(".card").forEach((card) => {
    gsap.from(card, {
        scrollTrigger: {
            trigger: card,
            start: "top 80%",
            markers: false, 
        },
        opacity: 0,
        y: 60,
        duration: 0.85
    });

    const images = document.querySelectorAll('.section-image');
    images.forEach(image => {
        image.addEventListener('mouseenter', () => {
            gsap.to(image, {
                scale: 1.1, 
                duration: 0.3, 
                ease: 'power2.out'
            });
        });

        image.addEventListener('mouseleave', () => {
            gsap.to(image, {
                scale: 1, 
                duration: 0.3, 
                ease: 'power2.out'
            });
        });
    });
});