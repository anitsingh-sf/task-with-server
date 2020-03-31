var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { userDataModel } from './dataModel.js';
import { manipulateButtons } from './manipulateButtons.js';
import { newUserEntryMethod } from './newUserEntry.js';
import { Roles } from './dataModel.js';
import { logic } from './logic.js';
import { addEventListenerToTable } from './addEvents.js';
class UI {
    constructor() {
        this.userData = [];
        this.bodyBeforeEditable = document.getElementById("tableBody");
        this.count = 0;
        let selectList = document.createElement("select");
        let newUserSelectList = document.createElement("select");
        selectList.id = "mySelect";
        newUserSelectList.id = "newUserSelect";
        for (let i in Roles) {
            if (!isNaN(Number(i))) {
                let option = document.createElement("option");
                let newUserOption = document.createElement("option");
                option.value = i;
                option.text = Roles[i];
                newUserOption.value = i;
                newUserOption.text = Roles[i];
                selectList.appendChild(option);
                newUserSelectList.appendChild(newUserOption);
            }
        }
        this.dropdown = selectList;
        this.dropdownNewUser = newUserSelectList;
        let idCell = document.getElementById("newUserRole");
        this.dropdownNewUser.selectedIndex = +Roles[0];
        idCell.replaceWith(this.dropdownNewUser);
    }
    getNum() {
        return this.count++;
    }
    reallign() {
        return __awaiter(this, void 0, void 0, function* () {
            this.userData = yield logic.read().then(res => res.json());
        });
    }
    createUser() {
        document.getElementById("newEntryTable").style.visibility = "visible";
        let newUserEntryCell = document.getElementsByClassName("newEntryCol");
        for (let i = 0; i < newUserEntryCell.length; i++) {
            newUserEntryCell[i].innerHTML = "";
        }
        let saveBtn = document.getElementById("saveButton");
        let cancelBtn = document.getElementById("cancelButton");
        if (saveBtn) {
            saveBtn.addEventListener("click", newUserEntryMethod.save);
        }
        if (cancelBtn) {
            cancelBtn.addEventListener("click", newUserEntryMethod.cancel);
        }
    }
    loadData() {
        return __awaiter(this, void 0, void 0, function* () {
            this.userData = yield logic.read().then(res => res.json());
            document.getElementById("showButton").innerHTML = "Refresh Data";
            document.getElementById("dataTable").style.visibility = "visible";
            document.getElementById("newEntryButton").style.visibility = "visible";
            let oldBody;
            let newBody;
            let obj, j;
            oldBody = document.getElementById("tableBody");
            newBody = document.createElement("tbody");
            newBody.setAttribute("id", "tableBody");
            for (j = 0; j < this.userData.length; j++) {
                obj = this.userData[j];
                let tr = document.createElement("tr");
                tr.setAttribute("id", "row" + j);
                tr.innerHTML = '<td contenteditable="false">' + obj.firstName + '</td>' +
                    '<td contenteditable="false">' + obj.middleName + '</td>' +
                    '<td contenteditable="false">' + obj.lastName + '</td>' +
                    '<td contenteditable="false">' + obj.eMail + '</td>' +
                    '<td contenteditable="false">' + obj.phone + '</td>' +
                    '<td contenteditable="false">' + Roles[obj.role] + '</td>' +
                    '<td contenteditable="false">' + obj.address + '</td>' +
                    '<td> <button type="button" class="edit btn btn-primary" id="edit">Edit Data</button></td>' +
                    '<td> <button type="button" class="delete btn btn-primary" id="delete">Delete Data</button></td>';
                newBody.appendChild(tr);
            }
            oldBody.parentNode.replaceChild(newBody, oldBody);
            this.count = this.userData.length;
            addEventListenerToTable();
        });
    }
    updateRow(rowIndex, key) {
        let table = document.getElementById("tableBody");
        if (key == "E") {
            let bodyBeforeEditable = table.cloneNode(true);
            let rowBeforeEditable = bodyBeforeEditable.rows[rowIndex];
            let firstBtn = rowBeforeEditable.childNodes[7].childNodes[1];
            let secondBtn = rowBeforeEditable.childNodes[8].childNodes[1];
            firstBtn.setAttribute("id", "edit");
            secondBtn.setAttribute("id", "delete");
            this.bodyBeforeEditable = bodyBeforeEditable;
            let row = table.rows[rowIndex];
            for (let i = 0; i < 7; i++) {
                let idCell = row.childNodes[i];
                if (i == 5) {
                    let prevVal = idCell.textContent;
                    this.dropdown.selectedIndex = +Roles[prevVal];
                    idCell.replaceWith(this.dropdown);
                    continue;
                }
                idCell.setAttribute("contenteditable", "true");
            }
            manipulateButtons.changeButton(rowIndex, key);
            manipulateButtons.disableButtons(rowIndex);
        }
        else {
            let row = table.rows[rowIndex];
            for (let i = 0; i < 7; i++) {
                let idCell = row.childNodes[i];
                if (i == 5) {
                    let idCell = document.getElementById("mySelect");
                    let selectedVal = +idCell.options[idCell.selectedIndex].value;
                    let td = document.createElement('td');
                    td.innerHTML = Roles[selectedVal];
                    idCell.replaceWith(td);
                    continue;
                }
                idCell.setAttribute("contenteditable", "false");
            }
            let updatedUserData = new userDataModel();
            row = table.rows[rowIndex];
            updatedUserData.firstName = row.childNodes[0].textContent;
            updatedUserData.middleName = row.childNodes[1].textContent;
            updatedUserData.lastName = row.childNodes[2].textContent;
            updatedUserData.eMail = row.childNodes[3].textContent;
            updatedUserData.phone = row.childNodes[4].textContent;
            updatedUserData.role = Roles[row.childNodes[5].textContent];
            updatedUserData.address = row.childNodes[6].textContent;
            updatedUserData.index = this.userData[rowIndex].index;
            logic.update(updatedUserData);
            manipulateButtons.changeButton(rowIndex, key);
            manipulateButtons.enableButtons();
        }
    }
    deleteRow(rowIndex, key) {
        if (key == "D") {
            let table = document.getElementById("tableBody");
            table.deleteRow(rowIndex);
            let index = {
                "index": this.userData[rowIndex].index
            };
            this.userData.splice(rowIndex, 1);
            logic.delete(index);
        }
        else {
            let currBody = document.getElementById("tableBody");
            currBody.parentNode.replaceChild(this.bodyBeforeEditable, currBody);
            manipulateButtons.changeButton(rowIndex, key);
            addEventListenerToTable();
        }
    }
}
;
export let view = new UI();
document.addEventListener("DOMContentLoaded", function () {
    let btn = document.getElementById("showButton");
    if (btn) {
        btn.addEventListener("click", () => view.loadData());
    }
    btn = document.getElementById("newEntryButton");
    if (btn) {
        btn.addEventListener("click", () => view.createUser());
    }
});
