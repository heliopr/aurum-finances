import { Data } from "./storage";

export enum TransactionType {
    Revenue = 1,
    Expense
};

export interface TransactionData {
    index?: number;
    name: string;
    value: number;
    type: TransactionType;
    time: number;
};

export function getTransactionTypeName(type: TransactionType): string {
    return type == TransactionType.Revenue ? "Receita" : "Despesa";
}

export function insertTransaction(data: Data, transaction: TransactionData) {
    data.lastTransactionIndex++;
    transaction.index = data.lastTransactionIndex;
    data.transactions.unshift(transaction);
}

export function filterTransactions(transactions: TransactionData[], filter: string) {
    const type = filter=="revenues"?TransactionType.Revenue:TransactionType.Expense;
    return transactions.filter(x => x.type == type);
}

export function deleteTransaction(data: Data, index: number) {
    data.transactions = data.transactions.filter((x) => x.index != index);
}

export function sortByDate(transactions: TransactionData[], invert: boolean = false) {
    return [...transactions].sort((a, b) => (a.time - b.time) * (invert ? -1 : 1));
}

export function sortByValue(transactions: TransactionData[], invert: boolean = false) {
    return [...transactions].sort((a, b) => (a.value - b.value) * (invert ? -1 : 1));
}

export function sortByCreation(transactions: TransactionData[], invert: boolean = false) {
    return [...transactions].sort((a, b) => (a.index! - b.index!) * (invert ? -1 : 1));
}