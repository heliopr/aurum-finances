import { Data, getData, saveData } from "../../modules/storage";
import { getTransactionTypeName, insertTransaction, TransactionData, TransactionType } from "../../modules/transactions";
import { formatDate } from "../../modules/util";

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

insertTransaction(data, {
    name: "Mercado",
    value: 57.9,
    time: new Date().getTime(),
    type: TransactionType.Expense
});
renderTransactionsList();
console.log(data.transactions);
saveData(data);
console.log("transactions saved");