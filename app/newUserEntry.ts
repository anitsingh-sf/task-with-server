import { view } from './app.js';
import { userDataModel, Roles, Customer } from './dataModel.js';
import { logic } from './logic.js';
import { addEventListenerToTable } from './addEvents.js';

class newUserEntry {
    save() {
        let newUserData: userDataModel = new userDataModel();
        let newUserEntryCell = document.getElementsByClassName("newEntryCol")! as HTMLCollection;

        newUserData.firstname = newUserEntryCell[0].innerHTML;
        newUserData.middlename = newUserEntryCell[1].innerHTML;
        newUserData.lastname = newUserEntryCell[2].innerHTML;
        newUserData.email = newUserEntryCell[3].innerHTML;
        newUserData.phone = newUserEntryCell[4].innerHTML;
        
        let idCell = document.getElementById("newUserSelect")! as HTMLSelectElement;
        newUserData.role = idCell!.selectedIndex;

        idCell = document.getElementById("newUserCustomer")! as HTMLSelectElement;
        newUserData.customer = idCell!.selectedIndex;
        
        newUserData.address = newUserEntryCell[5].innerHTML;

        let oldBody: HTMLTableSectionElement;
        oldBody = document.getElementById("tableBody")! as HTMLTableSectionElement;

        let tr = document.createElement("tr") as HTMLTableRowElement;

        tr.innerHTML = '<td contenteditable="false">' + newUserData.firstname + '</td>' +
        '<td contenteditable="false">' + newUserData.middlename + '</td>' +
        '<td contenteditable="false">' + newUserData.lastname + '</td>' +
        '<td contenteditable="false">' + newUserData.email + '</td>' +
        '<td contenteditable="false">' + newUserData.phone + '</td>' +
        '<td contenteditable="false">' + Roles[newUserData.role] + '</td>' +
        '<td contenteditable="false">' + Customer[newUserData.customer] + '</td>' +
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
