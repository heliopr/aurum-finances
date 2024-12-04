import { Chart, ChartItem } from "chart.js/auto";
import { Data, getData } from "../modules/storage";
import { aggregateTransactions, aggregateTransactionsByMonth, filterLastXMonths, TransactionType } from "../modules/transactions";
import { getLastXMonthsLabels } from "../modules/util";

const main = document.querySelector("main")!;
const title = main.querySelector("#title")!;
const gastosDisplay = main.querySelector("#gastos-display")!;
const ganhosDisplay = main.querySelector("#ganhos-display")!;
const diffDisplay = main.querySelector("#diff-display")!;
const saldoDisplay = main.querySelector("#saldo-display")!;

const gastosChart = new Chart(<ChartItem>document.querySelector("#chart1 canvas")!, {
    type: 'bar',
    data: {
        labels: [],
        datasets: [{
            label: 'R$ gastos',
            data: [],
            borderWidth: 1,
            backgroundColor: "rgb(238, 185, 53, 0.8)",
            borderColor: "rgb(131, 99, 19)"
        }]
    },
    options: {
        maintainAspectRatio: false,
    }
});

const ganhosChart = new Chart(<ChartItem>document.querySelector("#chart2 canvas")!, {
    type: 'bar',
    data: {
        labels: [],
        datasets: [{
            label: 'R$ ganhos',
            data: [],
            borderWidth: 1,
            backgroundColor: "rgb(238, 185, 53, 0.8)",
            borderColor: "rgb(131, 99, 19)"
        }]
    },
    options: {
        maintainAspectRatio: false,
    }
});

const data: Data = getData();

function updateInfo() {
    title.textContent = `Mês de ${getLastXMonthsLabels(1)[0]}`

    const transactions = filterLastXMonths(data.transactions, 1);

    const ganhosMes = aggregateTransactions(transactions.filter(x => x.type == TransactionType.Revenue));
    const gastosMes = aggregateTransactions(transactions.filter(x => x.type == TransactionType.Expense));

    ganhosDisplay.textContent = `Total de ganhos: R$${ganhosMes}`;
    gastosDisplay.textContent = `Total de gastos: R$${gastosMes}`;
    diffDisplay.textContent = `Diferença: R$${ganhosMes-gastosMes}`;

    const allGanhos = aggregateTransactions(data.transactions.filter(x => x.type == TransactionType.Revenue));
    const allGastos = aggregateTransactions(data.transactions.filter(x => x.type == TransactionType.Expense));
    saldoDisplay.textContent = `Saldo: R$${allGanhos-allGastos}`;
}

function updateGanhosChart() {
    const numMonths = 6;

    let transactions = data.transactions.filter(t => t.type == TransactionType.Revenue);
    transactions = filterLastXMonths(transactions, numMonths);
    
    ganhosChart.data.xLabels = getLastXMonthsLabels(numMonths) as any;
    ganhosChart.data.datasets[0].data = aggregateTransactionsByMonth(transactions, numMonths) as any;
    ganhosChart.update();
}

function updateGastosChart() {
    const numMonths = 6;

    let transactions = data.transactions.filter(t => t.type == TransactionType.Expense);
    transactions = filterLastXMonths(transactions, numMonths);

    gastosChart.data.xLabels = getLastXMonthsLabels(numMonths) as any;
    gastosChart.data.datasets[0].data = aggregateTransactionsByMonth(transactions, numMonths) as any;
    gastosChart.update();
}

updateGanhosChart();
updateGastosChart();

updateInfo();