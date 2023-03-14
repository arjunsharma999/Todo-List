const express = require("express");
const app = express();
const mysql = require("mysql2");
const bodyparser = require("body-parser");
const cors = require("cors");



const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "123456789",
    database: "crud_contact",

});

app.use(cors());
app.use(express.json());
app.use(bodyparser.urlencoded({ extended: true }));

app.get("/api/get", (req, res) => {
    const sqlGet = "SELECT * FROM contact_db";
    db.query(sqlGet, (error, result) => {
        res.send(result);
    });
});

app.post("/api/post", (req, res) =>{
const { name, email, contact } = req.body;
const sqlInsert = "INSERT INTO contact_db (name, email, contact) VALUES (?, ?, ?)";
db.query(sqlInsert,[name, email, contact],(error, result) =>{
    if (error){
        console.log(error);
    }
});

});

app.delete("/api/remove/id", (req, res) =>{
    const { id } = req.params;
    const sqlRemove = "DELETE FROM contact_db WHERE id = ?";
    db.query(sqlRemove, id, (error, result) =>{
        if (error){
            console.log(error);
        }
    });
    
    });

    app.get("/api/get/id", (req, res) => {
        const {id} = req.params;
        const sqlGet = "SELECT * FROM contact_db where id = ?";
        db.query(sqlGet, id, (error, result) => {
            if(error){
                console.log(error);
            }
            res.send(result);
        });
    });


    app.put("/api/put/id", (req, res) => {
        const {id} = req.params;
        const {name, email, contact} = req.body;
        const sqlUpdate = "UPDATE contact_db SET name = ?, email = ?, contact = ? WHERE id =?";
        const sqlGet = "SELECT * FROM contact_db Where id = ?";
        db.query(sqlGet, [name, email, contact, id], (error, result) => {
            if(error){
                console.log(error);
            }
            res.send(result);
        });
    });


app.get("/", (req, res) => {
    // const sqlInsert = "INSERT INTO contact_db (name, email, contact) VALUES ('arjun', 'arjunsharmarke04@gmail.com', '7505700448')";
    // db.query(sqlInsert, (error, result) => {
    //     console.log("error", error);
    //     console.log("result", result);

    // });
     res.send("hello express");

});

app.listen(5000, () => {
    console.log("server is running on port 5000");
});