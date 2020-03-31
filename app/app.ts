import { userDataModel } from './dataModel.js';
import { manipulateButtons } from './manipulateButtons.js';
import { newUserEntryMethod } from './newUserEntry.js';
import { Roles, Customer } from './dataModel.js';
import { logic } from './logic.js';
import { addEventListenerToTable } from './addEvents.js';

interface PresentationLayer {
    dropdownRole: HTMLSelectElement;
    dropdownCustomer: HTMLSelectElement;
    bodyBeforeEditable: HTMLTableElement;
    userData: userDataModel[];
    reallign(): Promise<void>;
    createUser(): void;
    loadData(): Promise<void>;
    updateRow(rowIndex: number, key: string, firstBtn: HTMLButtonElement, secondBtn: HTMLButtonElement): void;
    deleteRow(rowIndex: number, key: string): void;
}

class UI implements PresentationLayer {
    dropdownRole: HTMLSelectElement;
    dropdownCustomer: HTMLSelectElement;
    bodyBeforeEditable: HTMLTableElement;
    userData: userDataModel[] = [];

    constructor() {
        this.bodyBeforeEditable = document.getElementById("tableBody")! as HTMLTableElement;
        let roleSelectList: HTMLSelectElement = document.createElement("select");
        let newUserSelectList: HTMLSelectElement = document.createElement("select");
        roleSelectList.id = "mySelect";
        newUserSelectList.id = "newUserSelect";

        for(let i in Roles) {
            if (!isNaN(Number(i))) {
                let option: HTMLOptionElement = document.createElement("option");
                let newUserOption: HTMLOptionElement = document.createElement("option");

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

        let idCell: any = document.getElementById("newUserRole");
        idCell!.replaceWith(newUserSelectCell);

        let customerSelectList: HTMLSelectElement = document.createElement("select");
        let newUserCustomerList: HTMLSelectElement = document.createElement("select");
        customerSelectList.id = "myCustomerSelect";
        newUserCustomerList.id = "newUserCustomer";

        for(let i in Customer) {
            if (!isNaN(Number(i))) {
                let option: HTMLOptionElement = document.createElement("option");
                let newUserCustomerOption: HTMLOptionElement = document.createElement("option");

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
        idCell!.replaceWith(newUserCustomerCell);
    }

    async reallign(): Promise<void> {
        this.userData = await logic.read().then(res => res.json());
    }

    createUser(): void {
        document.getElementById("newEntryTable")!.style.visibility = "visible";

        let newUserEntryCell: HTMLCollectionOf<Element> = document.getElementsByClassName("newEntryCol");
        for(let i=0; i<newUserEntryCell.length; i++) {
            newUserEntryCell[i].innerHTML = "";
        }
        
        let saveBtn = document.getElementById("saveButton")! as HTMLButtonElement;
        let cancelBtn = document.getElementById("cancelButton")! as HTMLButtonElement;
        if (saveBtn) {
            saveBtn.addEventListener("click", newUserEntryMethod.save);
        }
        if (cancelBtn) {
            cancelBtn.addEventListener("click", newUserEntryMethod.cancel);
        }
    }

    async loadData(): Promise<void> {
        this.userData = await logic.read().then(res => res.json());
        document.getElementById("showButton")!.innerHTML = "Refresh Data";
        document.getElementById("dataTable")!.style.visibility = "visible";
        document.getElementById("newEntryButton")!.style.visibility = "visible";

        let oldBody: HTMLTableSectionElement;
        let newBody: HTMLTableSectionElement;
        let obj: userDataModel, j: number;
        
        oldBody = document.getElementById("tableBody")! as HTMLTableSectionElement;
        newBody = document.createElement("tbody");
        newBody.setAttribute("id", "tableBody");
        for(j=0; j<this.userData.length; j++) {
            obj = this.userData[j]; 
            let tr: HTMLTableRowElement = document.createElement("tr");
            tr.setAttribute("id", "row"+j);
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

        oldBody.parentNode!.replaceChild(newBody, oldBody);

        addEventListenerToTable();
    }

    updateRow(rowIndex: number, key: string, firstBtn: HTMLButtonElement, secondBtn: HTMLButtonElement): void {      
        let table = document.getElementById("tableBody")! as HTMLTableElement;  
        if(key == "E") {
            let bodyBeforeEditable = table.cloneNode(true)! as HTMLTableElement;
            let rowBeforeEditable = bodyBeforeEditable.rows[rowIndex] as HTMLTableRowElement;

            let fBtn = rowBeforeEditable.childNodes[8].childNodes[1] as HTMLButtonElement;
            let sBtn = rowBeforeEditable.childNodes[9].childNodes[1] as HTMLButtonElement;

            fBtn.setAttribute("id", "edit");
            sBtn.setAttribute("id", "delete"); 

            this.bodyBeforeEditable = bodyBeforeEditable;
            
            let row = table.rows[rowIndex];
            for(let i=0; i<8; i++) {
                let idCell: any = row.childNodes[i];
                if( i == 5) {
                    let prevVal: any = idCell!.textContent;
                    this.dropdownRole.selectedIndex = +Roles[prevVal];
                    idCell.firstChild!.replaceWith(this.dropdownRole);
                    continue;
                }
                if( i == 6 ) {
                    let prevVal: any = idCell!.textContent;
                    this.dropdownCustomer.selectedIndex = +Customer[prevVal];
                    idCell.firstChild!.replaceWith(this.dropdownCustomer);
                    continue;
                }
                idCell.setAttribute("contenteditable", "true");
            }

            firstBtn.setAttribute("id", "save");
            secondBtn.setAttribute("id", "cancel");

            manipulateButtons.changeButton(rowIndex, key);
            manipulateButtons.disableButtons(rowIndex);
        } else {
            let row = table.rows[rowIndex];
            let emailCheckFlag: boolean = false, phoneCheckFlag: boolean = false;

            let email: string = row.childNodes[3].textContent!;
            let phone: string = row.childNodes[4].textContent!;
            if(phone.match(/^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/)) {
                phoneCheckFlag = true;
            }

            if(email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
                emailCheckFlag = true;
            }

            if( phoneCheckFlag && emailCheckFlag ) {
                document.getElementById("danger")!.style.visibility = "hidden";
                console.log("Done");
                for(let i=0; i<8; i++) {
                    let idCell: any = row.childNodes[i];
                    if( i == 5) {
                        let selectCell = document.getElementById("mySelect")! as HTMLSelectElement;
                        let selectedVal: number = +selectCell.options[selectCell.selectedIndex].value;
                        idCell.innerHTML = Roles[selectedVal];
                        continue;
                    }
                    if(i == 6) {
                        let selectCell = document.getElementById("myCustomerSelect")! as HTMLSelectElement;
                        let selectedVal: number = +selectCell.options[selectCell.selectedIndex].value;
                        idCell.innerHTML = Customer[selectedVal];
                        continue;
                    }
                    idCell.setAttribute("contenteditable", "false");
                }
    
                let updatedUserData: userDataModel = new userDataModel();

                row = table.rows[rowIndex];
                updatedUserData.firstname = row.childNodes[0].textContent!;
                updatedUserData.middlename = row.childNodes[1].textContent!;
                updatedUserData.lastname = row.childNodes[2].textContent!;
                updatedUserData.email = row.childNodes[3].textContent!;
                updatedUserData.phone = row.childNodes[4].textContent!;
                updatedUserData.role = Roles[row.childNodes[5].textContent! as keyof typeof Roles];
                updatedUserData.customer = Customer[row.childNodes[6].textContent! as keyof typeof Customer];
                              
                updatedUserData.address = row.childNodes[7].textContent!;
                updatedUserData.index = this.userData[rowIndex].index

                firstBtn.setAttribute("id", "edit");
                secondBtn.setAttribute("id", "delete");

                logic.update(updatedUserData);
                manipulateButtons.changeButton(rowIndex, key);
                manipulateButtons.enableButtons();
            } else {
                document.getElementById("danger")!.style.visibility = "visible";
            }
        }
    }

    deleteRow(rowIndex: number, key: string) {
        if(key == "D") {
            let table = document.getElementById("tableBody")! as HTMLTableElement
            table.deleteRow(rowIndex);
            let index = {
                "index": this.userData[rowIndex].index
            }

            this.userData.splice(rowIndex, 1);
            logic.delete(index);
        } else {
            document.getElementById("danger")!.style.visibility = "hidden";
            let currBody = document.getElementById("tableBody")! as HTMLTableElement;
            currBody.parentNode!.replaceChild(this.bodyBeforeEditable, currBody);

            manipulateButtons.changeButton(rowIndex, key);
            addEventListenerToTable();
        }
    }
};

export let view: UI = new UI(); 

document.addEventListener("DOMContentLoaded", function () {
    let btn = document.getElementById("showButton") as HTMLButtonElement;
    if (btn) {
        btn.addEventListener("click", () => view.loadData());
    }
    btn = document.getElementById("newEntryButton") as HTMLButtonElement;
    if (btn) {
        btn.addEventListener("click", () => view.createUser());
    }
});
