"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const methods_js_1 = require("./methods.js");
const pg_1 = __importDefault(require("pg"));
const app = express_1.default();
app.use(cors_1.default());
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({
    extended: true
}));
const Pool = pg_1.default.Pool;
const run = new Pool({
    user: "postgres",
    host: "localhost",
    database: "user-app",
    password: "Anit123",
    port: 5432,
});
app.post("/api/addUser", (req, res) => {
    let index = methods_js_1.getUniqueIndex();
    const myQuery = "INSERT INTO data (firstname, middlename, lastname, email, phone, role, address, createdon, modifiedon)" +
        " VALUES ('" +
        req.body.firstname + "', '" +
        req.body.middlename + "', '" +
        req.body.lastname + "', '" +
        req.body.email + "', '" +
        req.body.phone + "', " +
        req.body.role + ", '" +
        req.body.address + "', current_timestamp, current_timestamp);";
    run.query(myQuery, (err) => {
        if (err) {
            throw err;
        }
        res.status(200).json("Successful");
    });
});
app.get("/api/getData", (req, res) => {
    const myQuery = "SELECT index, firstname, middlename, lastname, email, phone, role, address FROM data ORDER BY index DESC";
    console.log("Changed");
    run.query(myQuery, (err, results) => {
        if (err) {
            throw err;
        }
        res.status(200).json(results.rows);
    });
});
app.post("/api/updateUser", (req, res) => {
    const myQuery = "UPDATE data " +
        "SET firstname = '" + req.body.firstname + "'," +
        " lastname = '" + req.body.lastname + "'," +
        " middlename = '" + req.body.middlename + "'," +
        " email = '" + req.body.email + "'," +
        " phone = '" + req.body.phone + "'," +
        " role = " + req.body.role + "," +
        " address = '" + req.body.address + "'," +
        " modifiedon = current_timestamp" +
        " WHERE index = " + req.body.index + ";";
    console.log(myQuery);
    run.query(myQuery, (err) => {
        if (err) {
            throw err;
        }
        res.status(200).json("Successful");
    });
});
app.delete("/api/delUser", (req, res) => {
    const myQuery = "DELETE FROM data WHERE index = " + req.body.index + ";";
    run.query(myQuery, (err) => {
        if (err) {
            throw err;
        }
        res.status(200).json("Successful");
    });
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server started on PORT " + PORT));
