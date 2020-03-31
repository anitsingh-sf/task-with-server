import { userDataModel } from './dataModel.js';

interface Actions {
    create(newUserData: userDataModel): Promise<Response>;
    read(): Promise<Response>;
    update(updatedUserData: userDataModel): Promise<Response>;
    delete(index: object): Promise<Response>;
}

class User implements Actions {
    create(newUserData: userDataModel): Promise<Response> {
        return fetch("http://localhost:5000/api/addUser", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(newUserData)
        });
    }

    read(): Promise<Response> {
        return fetch("http://localhost:5000/api/getData", {
            method: "GET",
            headers: {
                "Content-type": "application/json"
            }
        });
    }

    update(updatedUserData: userDataModel): Promise<Response> {
        return fetch("http://localhost:5000/api/updateUser", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(updatedUserData)
        });
    }

    delete(index: object): Promise<Response> {
        return fetch("http://localhost:5000/api/delUser", {
            method: "DELETE",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(index)
        });
    }
}

export let logic: User = new User();
