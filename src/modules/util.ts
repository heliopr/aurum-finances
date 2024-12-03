export function hideAll(elements: NodeListOf<HTMLElement> | null) {
    elements?.forEach(e => e.classList.add("hidden"));
}

export function formatDate(date: Date) {
    return `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`;
}

export function UTCToBRT(utc: number) {
    return utc + (3600000 * 3);
}