const express = require("express");
const cors = require("cors");
const path = require("path");
const bcrypt = require("bcryptjs");

const db = require("./db");

const app = express();
const PORT = 5000;


// =====================================================
// MIDDLEWARE
// =====================================================

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({
    extended: true
}));

// Serve MediPredict frontend
app.use(express.static(__dirname));


// =====================================================
// HOME
// =====================================================

app.get("/", (req, res) => {

    res.sendFile(
        path.join(__dirname, "index.html")
    );

});


// =====================================================
// DAY 37 - USER REGISTRATION
// =====================================================

app.post("/api/register", async (req, res) => {

    const {
        name,
        email,
        password
    } = req.body;


    // Validate input
    if (!name || !email || !password) {

        return res.status(400).json({
            success: false,
            message: "Name, email and password are required"
        });

    }


    try {

        // Check whether email already exists

        const checkSql =
            "SELECT id FROM users WHERE email = ?";


        db.query(
            checkSql,
            [email],
            async (err, users) => {

                if (err) {

                    console.error(
                        "Database error:",
                        err
                    );

                    return res.status(500).json({
                        success: false,
                        message: "Database error"
                    });

                }


                // User already exists

                if (users.length > 0) {

                    return res.status(409).json({
                        success: false,
                        message:
                            "An account with this email already exists."
                    });

                }


                // =========================================
                // HASH PASSWORD
                // =========================================

                const hashedPassword =
                    await bcrypt.hash(password, 10);


                console.log(
                    "🔐 Password hashed successfully"
                );


                // =========================================
                // INSERT USER
                // =========================================

                const insertSql = `
                    INSERT INTO users
                    (name, email, password)
                    VALUES (?, ?, ?)
                `;


                db.query(
                    insertSql,
                    [
                        name,
                        email,
                        hashedPassword
                    ],
                    (err, result) => {

                        if (err) {

                            console.error(
                                "Registration error:",
                                err
                            );

                            return res.status(500).json({
                                success: false,
                                message:
                                    "Failed to register user"
                            });

                        }


                        console.log(
                            `✅ User registered with ID: ${result.insertId}`
                        );


                        res.status(201).json({

                            success: true,

                            message:
                                "Registration successful",

                            userId:
                                result.insertId

                        });

                    }
                );

            }
        );

    } catch (error) {

        console.error(
            "❌ Password hashing error:",
            error
        );


        res.status(500).json({

            success: false,

            message:
                "Registration failed"

        });

    }

});


// =====================================================
// DAY 37 - USER LOGIN
// =====================================================

app.post("/api/login", async (req, res) => {

    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {

        return res.status(400).json({
            success: false,
            message: "Email and password are required"
        });

    }

    try {

        // Find user by email
        const sql = "SELECT id, name, email, password FROM users WHERE email = ?";

        db.query(sql, [email], async (err, users) => {

            if (err) {

                console.error("Database error:", err);
                return res.status(500).json({
                    success: false,
                    message: "Database error"
                });

            }

            // User not found
            if (users.length === 0) {

                return res.status(401).json({
                    success: false,
                    message: "Invalid email or password"
                });

            }

            // Verify password using bcryptjs
            const user = users[0];
            const isPasswordValid = await bcrypt.compare(password, user.password);

            if (!isPasswordValid) {

                return res.status(401).json({
                    success: false,
                    message: "Invalid email or password"
                });

            }

            // Password is valid
            console.log(`✅ User logged in: ${user.email} (ID: ${user.id})`);

            res.status(200).json({
                success: true,
                message: "Login successful",
                userId: user.id,
                name: user.name,
                email: user.email
            });

        });

    } catch (error) {

        console.error("❌ Login error:", error);

        res.status(500).json({
            success: false,
            message: "Login failed"
        });

    }

});


// =====================================================
// DAY 37 - GET ALL USERS (For Admin View)
// =====================================================

app.get("/api/users", (req, res) => {

    const sql = "SELECT id, name, email, password, created_at FROM users ORDER BY id ASC";

    db.query(sql, (err, users) => {

        if (err) {

            console.error("Database error:", err);
            return res.status(500).json({
                success: false,
                message: "Failed to fetch users"
            });

        }

        console.log(`✅ Retrieved ${users.length} users from database`);

        res.status(200).json({
            success: true,
            message: "Users retrieved successfully",
            count: users.length,
            users: users
        });

    });

});


// =====================================================
// CREATE REPORT
// =====================================================

app.post("/api/reports", (req, res) => {

    const {
        email,
        name,
        report
    } = req.body;


    if (!email || !report) {

        return res.status(400).json({

            success: false,

            message:
                "Email and report are required"

        });

    }


    const findUser =
        "SELECT id FROM users WHERE email = ?";


    db.query(
        findUser,
        [email],
        (err, users) => {

            if (err) {

                console.error(err);

                return res.status(500).json({

                    success: false,

                    message:
                        "Database error"

                });

            }


            // =========================================
            // SAVE REPORT
            // =========================================

            const saveReport = (userId) => {

                const sql = `

                    INSERT INTO health_reports
                    (
                        user_id,
                        report_date,
                        answers,
                        conditions,
                        top_condition,
                        risk_level,
                        health_score,
                        recommendations
                    )

                    VALUES (?, ?, ?, ?, ?, ?, ?, ?)

                `;


                const values = [

                    userId,

                    report.date
                        ? new Date(report.date)
                        : new Date(),

                    JSON.stringify(
                        report.answers || {}
                    ),

                    JSON.stringify(
                        report.conditions || []
                    ),

                    report.topCondition || "",

                    report.riskLevel || "",

                    report.healthScore || 0,

                    JSON.stringify(
                        report.recommendations || []
                    )

                ];


                db.query(
                    sql,
                    values,
                    (err, result) => {

                        if (err) {

                            console.error(err);

                            return res.status(500).json({

                                success: false,

                                message:
                                    "Failed to create report"

                            });

                        }


                        res.status(201).json({

                            success: true,

                            message:
                                "Report created successfully",

                            id:
                                result.insertId

                        });

                    }
                );

            };


            // =========================================
            // USER EXISTS
            // =========================================

            if (users.length > 0) {

                saveReport(
                    users[0].id
                );

                return;

            }


            // =========================================
            // CREATE USER IF NEEDED
            // =========================================

            const createUser = `

                INSERT INTO users
                (name, email, password)

                VALUES (?, ?, ?)

            `;


            db.query(

                createUser,

                [
                    name || "MediPredict User",
                    email,
                    "local-auth"
                ],

                (err, result) => {

                    if (err) {

                        console.error(err);

                        return res.status(500).json({

                            success: false,

                            message:
                                "Failed to create user"

                        });

                    }


                    saveReport(
                        result.insertId
                    );

                }

            );

        }
    );

});


// =====================================================
// READ ALL REPORTS
// =====================================================

app.get("/api/reports", (req, res) => {

    const email =
        req.query.email;


    if (!email) {

        return res.status(400).json({

            success: false,

            message:
                "Email is required"

        });

    }


    const sql = `

        SELECT

            hr.id,

            hr.report_date,

            hr.answers,

            hr.conditions,

            hr.top_condition,

            hr.risk_level,

            hr.health_score,

            hr.recommendations

        FROM health_reports hr

        JOIN users u
        ON hr.user_id = u.id

        WHERE u.email = ?

        ORDER BY hr.report_date DESC

    `;


    db.query(
        sql,
        [email],
        (err, rows) => {

            if (err) {

                console.error(err);

                return res.status(500).json({

                    success: false,

                    message:
                        "Failed to fetch reports"

                });

            }


            const reports =
                rows.map(row => ({

                    id:
                        row.id,

                    date:
                        row.report_date,

                    answers:
                        row.answers,

                    conditions:
                        row.conditions,

                    topCondition:
                        row.top_condition,

                    riskLevel:
                        row.risk_level,

                    healthScore:
                        row.health_score,

                    recommendations:
                        row.recommendations

                }));


            res.json({

                success: true,

                reports

            });

        }
    );

});


// =====================================================
// READ ONE REPORT
// =====================================================

app.get("/api/reports/:id", (req, res) => {

    const reportId =
        req.params.id;

    const email =
        req.query.email;


    const sql = `

        SELECT

            hr.id,

            hr.report_date,

            hr.answers,

            hr.conditions,

            hr.top_condition,

            hr.risk_level,

            hr.health_score,

            hr.recommendations

        FROM health_reports hr

        JOIN users u
        ON hr.user_id = u.id

        WHERE
            hr.id = ?
            AND u.email = ?

    `;


    db.query(
        sql,
        [
            reportId,
            email
        ],
        (err, rows) => {

            if (err) {

                console.error(err);

                return res.status(500).json({

                    success: false,

                    message:
                        "Failed to fetch report"

                });

            }


            if (rows.length === 0) {

                return res.status(404).json({

                    success: false,

                    message:
                        "Report not found"

                });

            }


            const row =
                rows[0];


            res.json({

                success: true,

                report: {

                    id:
                        row.id,

                    date:
                        row.report_date,

                    answers:
                        row.answers,

                    conditions:
                        row.conditions,

                    topCondition:
                        row.top_condition,

                    riskLevel:
                        row.risk_level,

                    healthScore:
                        row.health_score,

                    recommendations:
                        row.recommendations

                }

            });

        }
    );

});


// =====================================================
// UPDATE REPORT
// =====================================================

app.put("/api/reports/:id", (req, res) => {

    const reportId =
        req.params.id;

    const {
        email,
        report
    } = req.body;


    if (!email || !report) {

        return res.status(400).json({

            success: false,

            message:
                "Email and report are required"

        });

    }


    const sql = `

        UPDATE health_reports hr

        JOIN users u
        ON hr.user_id = u.id

        SET

            hr.report_date = ?,

            hr.answers = ?,

            hr.conditions = ?,

            hr.top_condition = ?,

            hr.risk_level = ?,

            hr.health_score = ?,

            hr.recommendations = ?

        WHERE

            hr.id = ?

            AND u.email = ?

    `;


    const values = [

        report.date
            ? new Date(report.date)
            : new Date(),

        JSON.stringify(
            report.answers || {}
        ),

        JSON.stringify(
            report.conditions || []
        ),

        report.topCondition || "",

        report.riskLevel || "",

        report.healthScore || 0,

        JSON.stringify(
            report.recommendations || []
        ),

        reportId,

        email

    ];


    db.query(
        sql,
        values,
        (err, result) => {

            if (err) {

                console.error(err);

                return res.status(500).json({

                    success: false,

                    message:
                        "Failed to update report"

                });

            }


            if (result.affectedRows === 0) {

                return res.status(404).json({

                    success: false,

                    message:
                        "Report not found"

                });

            }


            res.json({

                success: true,

                message:
                    "Report updated successfully"

            });

        }
    );

});


// =====================================================
// DELETE REPORT
// =====================================================

app.delete("/api/reports/:id", (req, res) => {

    const reportId =
        req.params.id;

    const email =
        req.query.email;


    const sql = `

        DELETE hr

        FROM health_reports hr

        JOIN users u
        ON hr.user_id = u.id

        WHERE

            hr.id = ?

            AND u.email = ?

    `;


    db.query(
        sql,
        [
            reportId,
            email
        ],
        (err, result) => {

            if (err) {

                console.error(err);

                return res.status(500).json({

                    success: false,

                    message:
                        "Failed to delete report"

                });

            }


            if (result.affectedRows === 0) {

                return res.status(404).json({

                    success: false,

                    message:
                        "Report not found"

                });

            }


            res.json({

                success: true,

                message:
                    "Report deleted successfully"

            });

        }
    );

});


// =====================================================
// START SERVER
// =====================================================

app.listen(PORT, () => {

    console.log(
        `🚀 MediPredict server running at http://localhost:${PORT}`
    );

});