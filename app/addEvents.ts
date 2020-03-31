import { view } from "./app.js";

export function addEventListenerToTable() {
    let tableBody = document.getElementById("tableBody")! as HTMLTableElement;
    for(let i=0; i < tableBody.rows.length; i++) {
        tableBody.onclick = function(event) {
            let clickedElement = event.target as HTMLElement;
            if(clickedElement.tagName == "BUTTON") {
                let row = clickedElement.parentElement?.parentElement as HTMLTableRowElement;

                let firstBtn = row.childNodes[8].childNodes[1] as HTMLButtonElement;
                let secondBtn = row.childNodes[9].childNodes[1] as HTMLButtonElement;

                if(clickedElement.id == "edit") {
                    view.updateRow(row.rowIndex-1, "E", firstBtn, secondBtn);
                } else if(clickedElement.id == "delete") {
                    view.deleteRow(row.rowIndex-1, "D");
                } else if(clickedElement.id == "save") {
                    view.updateRow(row.rowIndex-1, "S", firstBtn, secondBtn);
                } else if(clickedElement.id == "cancel") {              
                    view.deleteRow(row.rowIndex-1, "C");
                }
            } 
        }
    }
}
 