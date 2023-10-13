const express = require('express');
const app = express();
const studentsRouter = require('./routes/students');
require('dotenv').config();
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api/students', studentsRouter);


app.listen(process.env.PORT ||3000, () => {
    console.log('Server is running on port 3000');
});

console.log(process);


/*
student{
    name,
    location
}

rosterDB{
    student1,
    student2,
    student3
}

- CREATE
    - POST /api/students
    {name, location}

- READ
    GET /api/students?name&location

- UPDATE
    - PUT /api/students/<name>
    {name?, location?}

- DELETE
    - DELETE /api/students/<name>
*/