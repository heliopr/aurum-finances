import Swal from "sweetalert2";
import checkboxIcon from "../assets/icons/checkboxgrad.svg";
import errorIcon from "../assets/icons/errorgrad.svg";
import questionIcon from "../assets/icons/questiongrad.svg";

export function successDialog(title: string) {
    return Swal.fire({
        title: title,
        imageUrl: checkboxIcon,
        imageWidth: 90,
        buttonsStyling: false,
        confirmButtonText: "Ok",
        customClass: {
            container: "dialog-button-gap"
        }
    });
}

export function errorDialog(title: string) {
    return Swal.fire({
        title: title,
        imageUrl: errorIcon,
        imageWidth: 90,
        buttonsStyling: false,
        confirmButtonText: "Ok",
        customClass: {
            container: "dialog-button-gap"
        }
    });
}

export function confirmDialog(title: string) {
    return Swal.fire({
        title: title,
        imageUrl: questionIcon,
        imageWidth: 90,
        showDenyButton: true,
        buttonsStyling: false,
        confirmButtonText: "Sim",
        denyButtonText: "Não",
        customClass: {
            container: "dialog-button-gap",
            denyButton: "button-secondary"
        }
    });
}