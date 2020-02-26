"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fs_1 = __importDefault(require("fs"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const methods_js_1 = require("./methods.js");
const app = express_1.default();
app.use(cors_1.default());
const filePath = __dirname + '/data/data.json';
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({
    extended: true
}));
app.post("/api/addUser", (req, res) => {
    const file = fs_1.default.readFileSync(filePath, 'utf-8');
    let currData = JSON.parse(file);
    let index = methods_js_1.getUniqueIndex();
    let newUser = {
        "firstName": req.body.firstName,
        "middleName": req.body.middleName,
        "lastName": req.body.lastName,
        "eMail": req.body.eMail,
        "phone": req.body.phone,
        "role": req.body.role,
        "address": req.body.address,
        "index": index
    };
    currData.push(newUser);
    let newData = JSON.stringify(currData);
    fs_1.default.writeFile(filePath, newData, 'utf-8', (err) => {
        if (err) {
            return console.log(err);
        }
        res.send("Successful");
    });
});
app.get("/api/getData", (req, res) => {
    const file = fs_1.default.readFileSync(filePath, 'utf-8');
    res.send(JSON.parse(file));
});
app.post("/api/updateUser", (req, res) => {
    const file = fs_1.default.readFileSync(filePath, 'utf-8');
    let currData = JSON.parse(file);
    let updatedUser = {
        "firstName": req.body.firstName,
        "middleName": req.body.middleName,
        "lastName": req.body.lastName,
        "eMail": req.body.eMail,
        "phone": req.body.phone,
        "role": req.body.role,
        "address": req.body.address,
        "index": req.body.index
    };
    for (let x = 0; x < currData.length; x++) {
        if (currData[x].index == req.body.index) {
            currData[x] = updatedUser;
        }
    }
    let newData = JSON.stringify(currData);
    fs_1.default.writeFile(filePath, newData, 'utf-8', (err) => {
        if (err) {
            return console.log(err);
        }
        res.send("Successful");
    });
});
app.delete("/api/delUser", (req, res) => {
    const file = fs_1.default.readFileSync(filePath, 'utf-8');
    let currData = JSON.parse(file);
    for (let x = 0; x < currData.length; x++) {
        if (currData[x].index == req.body.index) {
            currData.splice(x, 1);
            break;
        }
    }
    methods_js_1.removeUniqueIndex(req.body.index);
    let newData = JSON.stringify(currData);
    fs_1.default.writeFile(filePath, newData, 'utf-8', (err) => {
        if (err) {
            return console.log(err);
        }
        res.send("Successful");
    });
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server started on PORT " + PORT));
