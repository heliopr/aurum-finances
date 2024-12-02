import Swal from "sweetalert2";
import { Data, getData, saveData } from "../../modules/storage";
import { deleteTransaction, getTransactionTypeName, insertTransaction, TransactionData, TransactionType } from "../../modules/transactions";
import { formatDate } from "../../modules/util";
import { confirmDialog, customValidationMessage } from "../../modules/dialogs";

const main = document.querySelector("main")!;
const transactionsList = main.querySelector("#transactions")!;
const excluirButton = main.querySelector("#excluir-button")!;

const data: Data = getData();

let selected = 0;

function updateExcluirButton() {
    if (selected > 0 && excluirButton.classList.contains("button-disabled")) {
        excluirButton.classList.remove("button-disabled");
    } else if (selected == 0 && !excluirButton.classList.contains("button-disabled")) {
        excluirButton.classList.add("button-disabled");
    }
}

function renderTransaction(transactionData: TransactionData) {
    const div = document.createElement("div");
    div.classList.add("item", "transaction");

    div.innerHTML = /*html*/`
        <div id="top">
            <input type="checkbox" id="checkbox">
            <p id="name">${transactionData.name}</p>
        </div>
        <div id="bottom">
            <p id="value">R$${transactionData.value}</p>
            <p id="type">${getTransactionTypeName(transactionData.type)}</p>
            <p id="date">${formatDate(new Date(transactionData.time))}</p>
        </div>
    `;

    const checkbox = <HTMLInputElement>div.querySelector("#checkbox")!;

    function toggle() {
        if (checkbox.checked) {
            div.classList.add("selected");
            selected += 1;
        } else {
            div.classList.remove("selected");
            selected -= 1;
        }
        updateExcluirButton();
    }

    div.addEventListener("click", (event) => {
        const target = <HTMLElement>event.target;
        if (target.tagName !== "DIV") return;

        checkbox.checked = !checkbox.checked;
        toggle();
    });

    checkbox.addEventListener("click", toggle);

    if (transactionData.index) div.setAttribute("index", `${transactionData.index}`);
    return div;
}


function clearTransactions() {
    for (const e of transactionsList.querySelectorAll(".transaction")) {
        e.remove();
    }
}


function renderTransactionsList() {
    clearTransactions();
    selected = 0;
    updateExcluirButton();

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
        didOpen: () => {
            // set date input to current date
            (<HTMLInputElement>document.getElementById("swal-input-date")!).valueAsDate = new Date();
        },
        preConfirm: () => {
            const nameInput = (<HTMLInputElement>document.getElementById("swal-input-name")!).value;
            const valueInput = parseFloat((<HTMLInputElement>document.getElementById("swal-input-value")!).value);
            const typeInput = (<HTMLInputElement>document.getElementById("swal-input-type")!).value;
            const dateInput = (<HTMLInputElement>document.getElementById("swal-input-date")!).value;

            console.log(typeInput);

            const time = new Date(dateInput).getTime();

            if (nameInput.length < 2) customValidationMessage("Nome inválido!");
            if (isNaN(valueInput) || valueInput < 0) customValidationMessage("Valor inválido!");
            if (isNaN(time)) customValidationMessage("Data inválida!");

            return {
                name: nameInput,
                value: valueInput,
                type: typeInput=="revenue"?TransactionType.Revenue:TransactionType.Expense,
                time: time+(3600000*3) // UTC to BRT conversion
            };
        }
    }).then(result => {
        if (result.isConfirmed) {
            console.log(result.value);
            insertTransaction(data, result.value);
            saveData(data);
            renderTransactionsList();
        }
    })
}


function deleteTransactionsPrompt() {
    if (selected == 0) return;

    confirmDialog(`Você tem certeza de que quer excluir ${selected} transações?`).then((result) => {
        if (result.isConfirmed) {
            main.querySelectorAll(".selected").forEach((e) => {
                const index = parseInt(e.getAttribute("index")!);
                deleteTransaction(data, index);

                e.classList.remove("selected");
            });

            saveData(data);
            renderTransactionsList();
        }
    });
}



renderTransactionsList();

main.querySelector("#criar-button")!.addEventListener("click", createTransactionPrompt);
excluirButton.addEventListener("click", deleteTransactionsPrompt);