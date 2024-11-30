export function isLoggedIn(): boolean {
    return localStorage.getItem("loggedIn") === "true";
}

export function setIsLoggedIn(isLoggedIn: boolean) {
    localStorage.setItem("loggedIn", isLoggedIn ? "true" : "false");
}