const express = require("express");
const path = require("path");
const db = require("./db");

const app = express();
const PORT = 3000;

// Serve HTML, CSS and other files from public folder
app.use(express.static(path.join(__dirname, "public")));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Sample Database
let students = [
    { id: 1, name: "Afsin", department: "AI&DS" },
    { id: 2, name: "Rahul", department: "CSE" }
];
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

app.get("/projects", (req, res) => {
    const sql = "SELECT * FROM projects";

    db.query(sql, (err, results) => {
        if (err) {
            console.log("Database error:", err);
            return res.status(500).json({
                error: "Database error"
            });
        }

        res.json(results);
    });
});

app.get("/skills", (req, res) => {
    const sql = "SELECT * FROM skills";

    db.query(sql, (err, results) => {
        if (err) {
            console.log("Database error:", err);
            return res.status(500).json({
                error: "Database error"
            });
        }

        res.json(results);
    });
});

app.post("/contact", (req, res) => {
    const { name, email, message } = req.body;

    const sql = `
        INSERT INTO messages (name, email, message)
        VALUES (?, ?, ?)
    `;

    db.query(sql, [name, email, message], (err, result) => {
        if (err) {
            console.log("Database error:", err);
            return res.status(500).send("Failed to save message");
        }

        res.send("Message saved successfully!");
    });
});
// Start Server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});