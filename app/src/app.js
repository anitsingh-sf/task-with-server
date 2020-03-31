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
import { Roles, Customer } from './dataModel.js';
import { logic } from './logic.js';
import { addEventListenerToTable } from './addEvents.js';
class UI {
    constructor() {
        this.userData = [];
        this.bodyBeforeEditable = document.getElementById("tableBody");
        let roleSelectList = document.createElement("select");
        let newUserSelectList = document.createElement("select");
        roleSelectList.id = "mySelect";
        newUserSelectList.id = "newUserSelect";
        for (let i in Roles) {
            if (!isNaN(Number(i))) {
                let option = document.createElement("option");
                let newUserOption = document.createElement("option");
                option.value = i;
                option.text = Roles[i];
                newUserOption.value = i;
                newUserOption.text = Roles[i];
                roleSelectList.appendChild(option);
                newUserSelectList.appendChild(newUserOption);
            }
        }
        this.dropdownRole = roleSelectList;
        newUserSelectList.selectedIndex = +Roles[0];
        let newUserSelectCell = document.createElement('td');
        newUserSelectCell.appendChild(newUserSelectList);
        let idCell = document.getElementById("newUserRole");
        idCell.replaceWith(newUserSelectCell);
        let customerSelectList = document.createElement("select");
        let newUserCustomerList = document.createElement("select");
        customerSelectList.id = "myCustomerSelect";
        newUserCustomerList.id = "newUserCustomer";
        for (let i in Customer) {
            if (!isNaN(Number(i))) {
                let option = document.createElement("option");
                let newUserCustomerOption = document.createElement("option");
                option.value = i;
                option.text = Customer[i];
                newUserCustomerOption.value = i;
                newUserCustomerOption.text = Customer[i];
                customerSelectList.appendChild(option);
                newUserCustomerList.appendChild(newUserCustomerOption);
            }
        }
        this.dropdownCustomer = customerSelectList;
        newUserCustomerList.selectedIndex = +Customer[0];
        let newUserCustomerCell = document.createElement('td');
        newUserCustomerCell.appendChild(newUserCustomerList);
        idCell = document.getElementById("newUserCustomer");
        idCell.replaceWith(newUserCustomerCell);
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
                tr.innerHTML = '<td contenteditable="false">' + obj.firstname + '</td>' +
                    '<td contenteditable="false">' + obj.middlename + '</td>' +
                    '<td contenteditable="false">' + obj.lastname + '</td>' +
                    '<td contenteditable="false">' + obj.email + '</td>' +
                    '<td contenteditable="false">' + obj.phone + '</td>' +
                    '<td contenteditable="false">' + Roles[obj.role] + '</td>' +
                    '<td contenteditable="false">' + Customer[obj.customer] + '</td>' +
                    '<td contenteditable="false">' + obj.address + '</td>' +
                    '<td> <button type="button" class="edit btn btn-primary" id="edit">Edit Data</button></td>' +
                    '<td> <button type="button" class="delete btn btn-primary" id="delete">Delete Data</button></td>';
                newBody.appendChild(tr);
            }
            oldBody.parentNode.replaceChild(newBody, oldBody);
            addEventListenerToTable();
        });
    }
    updateRow(rowIndex, key, firstBtn, secondBtn) {
        let table = document.getElementById("tableBody");
        if (key == "E") {
            let bodyBeforeEditable = table.cloneNode(true);
            let rowBeforeEditable = bodyBeforeEditable.rows[rowIndex];
            let fBtn = rowBeforeEditable.childNodes[8].childNodes[1];
            let sBtn = rowBeforeEditable.childNodes[9].childNodes[1];
            fBtn.setAttribute("id", "edit");
            sBtn.setAttribute("id", "delete");
            this.bodyBeforeEditable = bodyBeforeEditable;
            let row = table.rows[rowIndex];
            for (let i = 0; i < 8; i++) {
                let idCell = row.childNodes[i];
                if (i == 5) {
                    let prevVal = idCell.textContent;
                    this.dropdownRole.selectedIndex = +Roles[prevVal];
                    idCell.firstChild.replaceWith(this.dropdownRole);
                    continue;
                }
                if (i == 6) {
                    let prevVal = idCell.textContent;
                    this.dropdownCustomer.selectedIndex = +Customer[prevVal];
                    idCell.firstChild.replaceWith(this.dropdownCustomer);
                    continue;
                }
                idCell.setAttribute("contenteditable", "true");
            }
            firstBtn.setAttribute("id", "save");
            secondBtn.setAttribute("id", "cancel");
            manipulateButtons.changeButton(rowIndex, key);
            manipulateButtons.disableButtons(rowIndex);
        }
        else {
            let row = table.rows[rowIndex];
            let emailCheckFlag = false, phoneCheckFlag = false;
            let email = row.childNodes[3].textContent;
            let phone = row.childNodes[4].textContent;
            if (phone.match(/^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/)) {
                phoneCheckFlag = true;
            }
            if (email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
                emailCheckFlag = true;
            }
            if (phoneCheckFlag && emailCheckFlag) {
                document.getElementById("danger").style.visibility = "hidden";
                console.log("Done");
                for (let i = 0; i < 8; i++) {
                    let idCell = row.childNodes[i];
                    if (i == 5) {
                        let selectCell = document.getElementById("mySelect");
                        let selectedVal = +selectCell.options[selectCell.selectedIndex].value;
                        idCell.innerHTML = Roles[selectedVal];
                        continue;
                    }
                    if (i == 6) {
                        let selectCell = document.getElementById("myCustomerSelect");
                        let selectedVal = +selectCell.options[selectCell.selectedIndex].value;
                        idCell.innerHTML = Customer[selectedVal];
                        continue;
                    }
                    idCell.setAttribute("contenteditable", "false");
                }
                let updatedUserData = new userDataModel();
                row = table.rows[rowIndex];
                updatedUserData.firstname = row.childNodes[0].textContent;
                updatedUserData.middlename = row.childNodes[1].textContent;
                updatedUserData.lastname = row.childNodes[2].textContent;
                updatedUserData.email = row.childNodes[3].textContent;
                updatedUserData.phone = row.childNodes[4].textContent;
                updatedUserData.role = Roles[row.childNodes[5].textContent];
                updatedUserData.customer = Customer[row.childNodes[6].textContent];
                updatedUserData.address = row.childNodes[7].textContent;
                updatedUserData.index = this.userData[rowIndex].index;
                firstBtn.setAttribute("id", "edit");
                secondBtn.setAttribute("id", "delete");
                logic.update(updatedUserData);
                manipulateButtons.changeButton(rowIndex, key);
                manipulateButtons.enableButtons();
            }
            else {
                document.getElementById("danger").style.visibility = "visible";
            }
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
            document.getElementById("danger").style.visibility = "hidden";
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
