import express from "express";
import fs from "fs";
import bodyParser from "body-parser";
import cors from "cors";
import { dataModel } from "./dataModel.js";
import { getUniqueIndex, removeUniqueIndex } from "./methods.js";

const app = express();
app.use(cors());

const filePath: string = __dirname + '/data/data.json';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.post("/api/addUser", (req, res) => {
    const file: string = fs.readFileSync(filePath, 'utf-8')
    let currData = JSON.parse(file);
    let index: string = getUniqueIndex();
    
    let newUser: dataModel = {
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

    fs.writeFile(filePath, newData, 'utf-8', (err) => {
        if(err) {
            return console.log(err);
        }
        res.send("Successful");
    });
});

app.get("/api/getData", (req, res) => { 
    const file: string = fs.readFileSync(filePath, 'utf-8')
    res.send(JSON.parse(file));
});

app.post("/api/updateUser", (req, res) => {
    const file: string = fs.readFileSync(filePath, 'utf-8')
    let currData = JSON.parse(file);
    let updatedUser: dataModel = {
        "firstName": req.body.firstName,
        "middleName": req.body.middleName,
        "lastName": req.body.lastName,
        "eMail": req.body.eMail,
        "phone": req.body.phone,
        "role": req.body.role,
        "address": req.body.address,
        "index": req.body.index
    };

    for(let x=0; x<currData.length; x++) {
        if(currData[x].index == req.body.index) {
            currData[x] = updatedUser;
        }
    }
    
    let newData = JSON.stringify(currData);

    fs.writeFile(filePath, newData, 'utf-8', (err) => {
        if(err) {
            return console.log(err);
        }
        res.send("Successful");
    });
});

app.delete("/api/delUser", (req, res) => {
    const file: string = fs.readFileSync(filePath, 'utf-8')
    let currData = JSON.parse(file);
    for(let x=0; x<currData.length; x++) {
        if(currData[x].index == req.body.index) {
            currData.splice(x, 1);
            break;
        }
    }

    removeUniqueIndex(req.body.index);
    let newData = JSON.stringify(currData);

    fs.writeFile(filePath, newData, 'utf-8', (err) => {
        if(err) {
            return console.log(err);
        }
        res.send("Successful");
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server started on PORT " + PORT));
