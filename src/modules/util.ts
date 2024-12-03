export function hideAll(elements: NodeListOf<HTMLElement> | null) {
    elements?.forEach(e => e.classList.add("hidden"));
}

export function formatDate(date: Date) {
    const newDate = new Date(UTCToBRT(date.getTime()));
    return `${newDate.getDate()}/${newDate.getMonth() + 1}/${newDate.getFullYear()}`;
}

export function UTCToBRT(utc: number) {
    return utc + (3600000 * 3);
}

export function toDateInputValue(date: Date) {
    const newDate = new Date(date.getTime());
    newDate.setMinutes(newDate.getMinutes() - newDate.getTimezoneOffset());
    return newDate.toJSON().slice(0, 10);
};