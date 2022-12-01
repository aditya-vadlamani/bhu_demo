const express = require('express');
const router = express.Router();
const mysql = require('mysql');

router.get('/', (req, res, next) => {
    res.send( {"message": "GET is working fine"} );
})


router.get('/all', (req, res, next) => {
    let connection = mysql.createConnection({
        host: "127.0.0.1",
        port: "8889",
        database: "bhu_demo",
        user: "bhu_user",
        password: "test@123"
    });

    let selectQuery = "SELECT * FROM student_list";

    connection.connect((err) => {
        if(err){
            console.log("Error occued " + err);
        }


        console.log("Connected to the database");

        connection.query(selectQuery, (err, rows) => {
            res.send(rows);
            connection.end();
        })
    })
})

router.post('/add', (req, res, next) =>{
    let connection = mysql.createConnection({
        host: "127.0.0.1",
        port: "8889",
        database: "bhu_demo",
        user: "bhu_user",
        password: "test@123"
    });


    connection.connect((err) => {
        if(err){
            console.log("Error occued " + err);
        }


        console.log("Connected to the database");

        var name = req.body.name;
        var rollno = req.body.rollno;
        var college = req.body.college;

        let insertQuery = "INSERT INTO student_list (name, rollno, college) VALUES (" 
        + connection.escape(name) + ", " + rollno + ", " + connection.escape(college) + ")";

        connection.query(insertQuery, (err) => {
            res.send({"message": "inserted"});
            connection.end();
        })
    })
})

module.exports = router;