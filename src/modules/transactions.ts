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