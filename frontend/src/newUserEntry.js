import { view } from './app.js';
import { userDataModel, Roles } from './dataModel.js';
import { logic } from './logic.js';
import { addEventListenerToTable } from './addEvents.js';
class newUserEntry {
    save() {
        let newUserData = new userDataModel();
        let newUserEntryCell = document.getElementsByClassName("newEntryCol");
        newUserData.firstname = newUserEntryCell[0].innerHTML;
        newUserData.middlename = newUserEntryCell[1].innerHTML;
        newUserData.lastname = newUserEntryCell[2].innerHTML;
        newUserData.email = newUserEntryCell[3].innerHTML;
        newUserData.phone = newUserEntryCell[4].innerHTML;
        let idCell = document.getElementById("newUserSelect");
        newUserData.role = idCell.selectedIndex;
        newUserData.address = newUserEntryCell[5].innerHTML;
        newUserData.index = "";
        let oldBody;
        oldBody = document.getElementById("tableBody");
        let tr = document.createElement("tr");
        tr.innerHTML = '<td contenteditable="false">' + newUserData.firstname + '</td>' +
            '<td contenteditable="false">' + newUserData.middlename + '</td>' +
            '<td contenteditable="false">' + newUserData.lastname + '</td>' +
            '<td contenteditable="false">' + newUserData.email + '</td>' +
            '<td contenteditable="false">' + newUserData.phone + '</td>' +
            '<td contenteditable="false">' + Roles[newUserData.role] + '</td>' +
            '<td contenteditable="false">' + newUserData.address + '</td>' +
            '<td> <button type="button" class="btn btn-primary" id="edit">Edit Data</button></td>' +
            '<td> <button type="button" class="btn btn-primary" id="delete">Delete Data</button></td>';
        oldBody.appendChild(tr);
        document.getElementById("newEntryTable").style.visibility = "hidden";
        addEventListenerToTable();
        logic.create(newUserData)
            .then(() => view.reallign());
    }
    cancel() {
        document.getElementById("newEntryTable").style.visibility = "hidden";
    }
}
export let newUserEntryMethod = new newUserEntry();
