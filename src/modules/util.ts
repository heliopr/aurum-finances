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

export function downloadBlob(blob: Blob, name: string = "file.txt") {
    // For other browsers:
    // Create a link pointing to the ObjectURL containing the blob.
    const data = window.URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = data;
    link.download = name;

    // this is necessary as link.click() does not work on the latest firefox
    link.dispatchEvent(
        new MouseEvent('click', {
            bubbles: true,
            cancelable: true,
            view: window
        })
    );

    setTimeout(() => {
        // For Firefox it is necessary to delay revoking the ObjectURL
        window.URL.revokeObjectURL(data);
        link.remove();
    }, 100);
}