class manipulateButtonsClass {
    changeButton(rowIndex: number, key: string) {
        let table = document.getElementById("tableBody")! as HTMLTableElement;
        let row = table.rows[rowIndex];
        if(key === "E") {
            row.childNodes[8].childNodes[1].textContent = "Save";
            row.childNodes[9].childNodes[1].textContent = "Cancel";
        } else if(key == "S" || key == "C") {
            row.childNodes[8].childNodes[1].textContent = "Edit Data";
            row.childNodes[9].childNodes[1].textContent = "Delete Data";
        }
    }

    disableButtons(rowIndex: number) {
        let table = document.getElementById("tableBody")! as HTMLTableElement;

        for(let i=0; i<table.rows.length; i++) {
            if(i == rowIndex) 
                continue;
            let row = table.rows[i];
            let editBtn = row.childNodes[8].childNodes[1]! as HTMLButtonElement;
            let delBtn = row.childNodes[9].childNodes[1]! as HTMLButtonElement;
            
            editBtn.disabled = true;
            delBtn.disabled = true;
        }
    }

    enableButtons() {
        let table = document.getElementById("tableBody")! as HTMLTableElement;

        for(let i=0; i<table.rows.length; i++) {
            let row = table.rows[i];
            let editBtn = row.childNodes[8].childNodes[1]! as HTMLButtonElement;
            let delBtn = row.childNodes[9].childNodes[1]! as HTMLButtonElement;
            
            editBtn.disabled = false;
            delBtn.disabled = false;
        }
    }
}

export let manipulateButtons: manipulateButtonsClass = new manipulateButtonsClass();
