class manipulateButtonsClass {
    changeButton(rowIndex, key) {
        let table = document.getElementById("tableBody");
        let row = table.rows[rowIndex];
        if (key === "E") {
            row.childNodes[7].childNodes[1].textContent = "Save";
            row.childNodes[8].childNodes[1].textContent = "Cancel";
        }
        else if (key == "S" || key == "C") {
            row.childNodes[7].childNodes[1].textContent = "Edit Data";
            row.childNodes[8].childNodes[1].textContent = "Delete Data";
        }
    }
    disableButtons(rowIndex) {
        let table = document.getElementById("tableBody");
        for (let i = 0; i < table.rows.length; i++) {
            if (i == rowIndex)
                continue;
            let row = table.rows[i];
            let editBtn = row.childNodes[7].childNodes[1];
            let delBtn = row.childNodes[8].childNodes[1];
            editBtn.disabled = true;
            delBtn.disabled = true;
        }
    }
    enableButtons() {
        let table = document.getElementById("tableBody");
        for (let i = 0; i < table.rows.length; i++) {
            let row = table.rows[i];
            let editBtn = row.childNodes[7].childNodes[1];
            let delBtn = row.childNodes[8].childNodes[1];
            editBtn.disabled = false;
            delBtn.disabled = false;
        }
    }
}
export let manipulateButtons = new manipulateButtonsClass();
