class User {
    create(newUserData) {
        return fetch("http://localhost:5000/api/addUser", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(newUserData)
        });
    }
    read() {
        return fetch("http://localhost:5000/api/getData", {
            method: "GET",
            headers: {
                "Content-type": "application/json"
            }
        });
    }
    update(updatedUserData) {
        return fetch("http://localhost:5000/api/updateUser", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(updatedUserData)
        });
    }
    delete(index) {
        return fetch("http://localhost:5000/api/delUser", {
            method: "DELETE",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(index)
        });
    }
}
export let logic = new User();
