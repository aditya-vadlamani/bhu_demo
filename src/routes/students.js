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


router.put('/edit/:name', (req, res, next) => {
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

        var name = req.params.name;
        var rollno = req.body.rollno;

        var updateQuery = "UPDATE student_list SET rollno = " + rollno + " WHERE name = " + connection.escape(name);

        connection.query(updateQuery, (err) => {
            if(err){
                console.log("error occured " + err);
            }

            res.send({"message": "student rollno updated"});
            connection.end();
        })
    })
});


router.delete("/delete/:name", (req, res, next) => {
    let connection = mysql.createConnection({
        host: "127.0.0.1",
        port: "8889",
        database: "bhu_demo",
        user: "bhu_user",
        password: "test@123"
    });

    connection.connect((err) => {
        if(err){
            console.log("error is " + err);
        }

        var name = req.params.name;

        var deleteQuery = "DELETE FROM student_list WHERE name = " + connection.escape(name);

        connection.query(deleteQuery, (err) => {
            if(err){
                console.log(err);
            }

            res.send({"message": "deleted"})
            connection.end();
        })
    })
})
module.exports = router;