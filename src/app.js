const express = require('express');

const app = express();

app.listen(3000, () => {
    console.log("App is listening on port 3000");
});

app.use(express.json());

const studentRouter = require('./routes/students');

app.use('/students', studentRouter);