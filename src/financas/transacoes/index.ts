import Swal from "sweetalert2";
import { Data, getData } from "../../modules/storage";
import { getTransactionTypeName, TransactionData } from "../../modules/transactions";
import { formatDate } from "../../modules/util";
import { customValidationMessage } from "../../modules/dialogs";

const main = document.querySelector("main")!;
const transactionsList = main.querySelector("#transactions")!;

const data: Data = getData();

function renderTransaction(transactionData: TransactionData) {
    const div = document.createElement("div");
    div.classList.add("item", "transaction");

    div.innerHTML = /*html*/`
        <p id="name">${transactionData.name}</p>
        <div id="bottom">
            <p id="value">R$${transactionData.value}</p>
            <p id="type">${getTransactionTypeName(transactionData.type)}</p>
            <p id="date">${formatDate(new Date(transactionData.time))}</p>
        </div>
    `;
    return div;
}

function renderTransactionsList() {
    for (const t of data.transactions) {
        const e = renderTransaction(t);
        transactionsList.appendChild(e);
    }
}

function createTransactionPrompt() {
    Swal.fire({
        title: "Criar Transação",
        showCancelButton: true,
        confirmButtonText: "Criar",
        cancelButtonText: "Cancelar",
        buttonsStyling: false,
        focusConfirm: false,
        html: /*html*/`
            <label for="swal-input-name">Nome:</label>
            <input id="swal-input-name" autocomplete="off" type="text">
            <br>
            <label for="swal-input-type">Tipo:</label>
            <select id="swal-input-type">
                <option value="revenue">Receita</option>
                <option value="expense">Despesa</option>
            </select>
            <br>
            <label for="swal-input-value">Valor:</label>
            <input id="swal-input-value" autocomplete="off" type="text">
            <br>
            <label for="swal-input-date">Data:</label>
            <input id="swal-input-date" type="date">
        `,
        customClass: {
            container: "dialog-button-gap create-transaction-prompt",
            cancelButton: "button-secondary",
            validationMessage: "custom-validation"
        },
        preConfirm: () => {
            const nameInput = (<HTMLInputElement>document.getElementById("swal-input-name")!).value;
            const valueInput = parseFloat((<HTMLInputElement>document.getElementById("swal-input-value")!).value);
            const typeInput = (<HTMLInputElement>document.getElementById("swal-input-type")!).value;
            const dateInput = (<HTMLInputElement>document.getElementById("swal-input-date")!).value;

            if (nameInput.length < 2) customValidationMessage("Nome inválido!");
            if (isNaN(valueInput)) customValidationMessage("Valor inválido!");
            if (isNaN(new Date(dateInput).getTime())) customValidationMessage("Data inválida!");

            return [nameInput, valueInput, typeInput, dateInput];
        }
    }).then(result => {
        console.log(result.value);
    })
}




renderTransactionsList();

main.querySelector("#criar-button")!.addEventListener("click", createTransactionPrompt);