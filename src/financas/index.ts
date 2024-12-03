import { Chart, ChartItem } from "chart.js/auto";
import { Data, getData } from "../modules/storage";
import { aggregateTransactionsByMonth, filterLastXMonths, TransactionType } from "../modules/transactions";
import { getLastXMonthsLabels } from "../modules/util";

const gastosChart = new Chart(<ChartItem>document.querySelector("#chart1 canvas")!, {
    type: 'bar',
    data: {
        labels: [],
        datasets: [{
            label: 'R$ gastos',
            data: [],
            borderWidth: 1
        }]
    }
});

const ganhosChart = new Chart(<ChartItem>document.querySelector("#chart2 canvas")!, {
    type: 'bar',
    data: {
        labels: [],
        datasets: [{
            label: 'R$ ganhos',
            data: [],
            borderWidth: 1
        }]
    }
});

const data: Data = getData();

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