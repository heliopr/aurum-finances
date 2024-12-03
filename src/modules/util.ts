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

const months = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
export function getLastXMonthsLabels(numMonths: number) {
    const current = new Date();

    let cont = current.getMonth();
    let list = [];
    for (let i = 0; i < numMonths; i++) {
        list.unshift(months[cont]);
        cont--;
        if (cont < 0) cont = months.length-1;
    }
    return list;
}

export function getMonthDiff(current: Date, date: Date) {
    return current.getMonth() - date.getMonth() + (12 * (current.getFullYear() - date.getFullYear()));
}