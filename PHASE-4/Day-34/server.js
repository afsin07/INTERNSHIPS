const express = require("express");

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// Sample Database
let students = [
    { id: 1, name: "Afsin", department: "AI&DS" },
    { id: 2, name: "Rahul", department: "CSE" }
];

// Home Route
app.get("/", (req, res) => {
    res.send("Welcome to REST API Demo");
});

// GET All Students
app.get("/students", (req, res) => {
    res.json(students);
});

// GET Student by ID
app.get("/students/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const student = students.find(s => s.id === id);

    if (!student) {
        return res.status(404).json({
            message: "Student Not Found"
        });
    }

    res.json(student);
});

// POST Student
app.post("/students", (req, res) => {

    const newStudent = {
        id: students.length + 1,
        name: req.body.name,
        department: req.body.department
    };

    students.push(newStudent);

    res.status(201).json({
        message: "Student Added Successfully",
        data: newStudent
    });

});

// PUT Update Student
app.put("/students/:id", (req, res) => {

    const id = parseInt(req.params.id);

    const student = students.find(s => s.id === id);

    if (!student) {
        return res.status(404).json({
            message: "Student Not Found"
        });
    }

    student.name = req.body.name;
    student.department = req.body.department;

    res.json({
        message: "Student Updated Successfully",
        data: student
    });

});

// DELETE Student
app.delete("/students/:id", (req, res) => {

    const id = parseInt(req.params.id);

    const student = students.find(s => s.id === id);

    if (!student) {
        return res.status(404).json({
            message: "Student Not Found"
        });
    }

    students = students.filter(s => s.id !== id);

    res.json({
        message: "Student Deleted Successfully"
    });

});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});