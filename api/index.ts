import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import pg from "pg";

const app = express();
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

const Pool = pg.Pool;
const run = new Pool({
    user: "postgres",
    host: "localhost",
    database: "user-app",
    password: "Anit123",
    port: 5432,
})

app.post("/api/addUser", (req, res) => {
    const myQuery = "INSERT INTO data (firstname, middlename, lastname, email, phone, role, customer, address)" +
    " VALUES ('" +
        req.body.firstname + "', '" +
        req.body.middlename + "', '" +
        req.body.lastname + "', '" +
        req.body.email + "', '" +
        req.body.phone + "', " +
        req.body.role + ", " +
        req.body.customer + ", '" +
        req.body.address + "');";


    run.query(myQuery, (err) => {
        if (err) {
            throw console.log(err);
        }
        res.status(200).json("Successful");
    });
});

app.get("/api/getData", (req, res) => { 
    const myQuery = "SELECT index, firstname, middlename, lastname, email, phone, role, customer, address FROM data ORDER BY index DESC";
    
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
        " customer = " + req.body.customer + "," +
        " address = '" + req.body.address + "'" +
        " WHERE index = " + req.body.index + ";";

    run.query(myQuery, (err) => {
        if (err) {
            throw err;
        }
        res.status(200).json("Successful");
    });
});

app.delete("/api/delUser", (req, res) => {
    const myQuery = "DELETE FROM data WHERE index = " + req.body.index + ";" 
    
    run.query(myQuery, (err) => {
        if (err) {
            throw err;
        }
        res.status(200).json("Successful");
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server started on PORT " + PORT));
