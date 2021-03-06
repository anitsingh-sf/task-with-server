import { view } from './app.js';
import { userDataModel, Roles } from './dataModel.js';
import { logic } from './logic.js';
import { addEventListenerToTable } from './addEvents.js';

class newUserEntry {
    save() {
        let newUserData: userDataModel = new userDataModel();
        let newUserEntryCell = document.getElementsByClassName("newEntryCol")! as HTMLCollection;

        newUserData.firstName = newUserEntryCell[0].innerHTML;
        newUserData.middleName = newUserEntryCell[1].innerHTML;
        newUserData.lastName = newUserEntryCell[2].innerHTML;
        newUserData.eMail = newUserEntryCell[3].innerHTML;
        newUserData.phone = newUserEntryCell[4].innerHTML;
        
        let idCell = document.getElementById("newUserSelect")! as HTMLSelectElement;
        newUserData.role = idCell!.selectedIndex;
        
        newUserData.address = newUserEntryCell[5].innerHTML;
        newUserData.index = "";

        let oldBody: HTMLTableSectionElement;
        oldBody = document.getElementById("tableBody")! as HTMLTableSectionElement;

        let tr = document.createElement("tr") as HTMLTableRowElement;

        tr.innerHTML = '<td contenteditable="false">' + newUserData.firstName + '</td>' +
        '<td contenteditable="false">' + newUserData.middleName + '</td>' +
        '<td contenteditable="false">' + newUserData.lastName + '</td>' +
        '<td contenteditable="false">' + newUserData.eMail + '</td>' +
        '<td contenteditable="false">' + newUserData.phone + '</td>' +
        '<td contenteditable="false">' + Roles[newUserData.role] + '</td>' +
        '<td contenteditable="false">' + newUserData.address + '</td>' +
        '<td> <button type="button" class="btn btn-primary" id="edit">Edit Data</button></td>' +
        '<td> <button type="button" class="btn btn-primary" id="delete">Delete Data</button></td>';

        oldBody.appendChild(tr);
        document.getElementById("newEntryTable")!.style.visibility = "hidden";

        addEventListenerToTable();

        logic.create(newUserData)
        .then(() => view.reallign());
    }

    cancel() {
        document.getElementById("newEntryTable")!.style.visibility = "hidden";
    }
}

export let newUserEntryMethod: newUserEntry = new newUserEntry();
