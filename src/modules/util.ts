export function hideAll(elements: NodeListOf<HTMLElement> | null) {
    elements?.forEach(e => e.classList.add("hidden"))
}