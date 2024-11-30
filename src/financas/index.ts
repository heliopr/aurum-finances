import { isLoggedIn } from "../modules/session";

if (!isLoggedIn()) {
    window.location.href = import.meta.env.BASE_URL;
}