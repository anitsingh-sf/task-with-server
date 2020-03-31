import { view } from "./app.js";
export function addEventListenerToTable() {
    let tableBody = document.getElementById("tableBody");
    for (let i = 0; i < tableBody.rows.length; i++) {
        tableBody.onclick = function (event) {
            var _a;
            let clickedElement = event.target;
            if (clickedElement.tagName == "BUTTON") {
                let row = (_a = clickedElement.parentElement) === null || _a === void 0 ? void 0 : _a.parentElement;
                let firstBtn = row.childNodes[8].childNodes[1];
                let secondBtn = row.childNodes[9].childNodes[1];
                if (clickedElement.id == "edit") {
                    view.updateRow(row.rowIndex - 1, "E", firstBtn, secondBtn);
                }
                else if (clickedElement.id == "delete") {
                    view.deleteRow(row.rowIndex - 1, "D");
                }
                else if (clickedElement.id == "save") {
                    view.updateRow(row.rowIndex - 1, "S", firstBtn, secondBtn);
                }
                else if (clickedElement.id == "cancel") {
                    view.deleteRow(row.rowIndex - 1, "C");
                }
            }
        };
    }
}
