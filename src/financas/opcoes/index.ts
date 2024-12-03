import { confirmDialog, successDialog } from "../../modules/dialogs";
import errorIcon from "../../assets/icons/errorgrad.svg";
import { getData } from "../../modules/storage";
import { downloadBlob } from "../../modules/util";

const main = document.querySelector("main")!;
const deletarButton = main.querySelector("#deletar-button")!;
const exportarButton = main.querySelector("#exportar-button")!;
const importarButton = main.querySelector("#importar-button")!;

deletarButton.addEventListener("click", () => {
    confirmDialog("Você tem certezade que quer deletar tudo?", errorIcon).then((result) => {
        if (result.isConfirmed) {
            localStorage.clear();
            window.location.href = import.meta.env.BASE_URL;
        }
    });
});

exportarButton.addEventListener("click", async () => {
    const data = getData();
    const dataBlob = new Blob([JSON.stringify(data)], {
        type: 'application/json'
    });

    downloadBlob(dataBlob, "dados.json");
});

importarButton.addEventListener("click", () => {
    const input = document.createElement("input");
    input.type = "file";

    input.onchange = () => {
        const reader = new FileReader();
        reader.onload = function () {
            const text = reader.result! as string;
            localStorage.setItem("data", text);
            successDialog("Dados carregados!");
        };
        reader.readAsText(input.files![0]);
    }

    input.click();
})