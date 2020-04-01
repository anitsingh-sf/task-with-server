export class dataProvider {
}
export let getUserData = () => {
    return fetch("http://localhost:5000/api/getData", {
        method: "GET",
        headers: {
            "Content-type": "application/json"
        }
    })
        .then(res => res);
};
