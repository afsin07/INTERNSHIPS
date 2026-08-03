const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

// Serve static files (CSS, images, etc.)
app.use(express.static(path.join(__dirname, "public")));

// Parse form data
app.use(express.urlencoded({ extended: true }));

// Home Page
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "index.html"));
});

// About Page
app.get("/about", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "about.html"));
});

// Projects Page
app.get("/projects", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "projects.html"));
});

// Contact Page
app.get("/contact", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "contact.html"));
});

// Handle Contact Form Submission
app.post("/contact", (req, res) => {

    const { name, email, message } = req.body;

    console.log("----- New Contact Message -----");
    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Message:", message);
    console.log("-------------------------------");

    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Message Received</title>
            <style>
                body{
                    font-family:Arial,sans-serif;
                    background:#f4f4f4;
                    display:flex;
                    justify-content:center;
                    align-items:center;
                    height:100vh;
                }

                .box{
                    background:white;
                    padding:30px;
                    border-radius:10px;
                    box-shadow:0 0 10px rgba(0,0,0,0.2);
                    text-align:center;
                }

                a{
                    display:inline-block;
                    margin-top:20px;
                    text-decoration:none;
                    background:#007BFF;
                    color:white;
                    padding:10px 20px;
                    border-radius:5px;
                }

                a:hover{
                    background:#0056b3;
                }
            </style>
        </head>

        <body>

            <div class="box">
                <h2>✅ Thank You!</h2>
                <p>Your message has been received successfully.</p>

                <a href="/">Back to Home</a>
            </div>

        </body>
        </html>
    `);

});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});