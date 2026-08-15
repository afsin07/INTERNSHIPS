require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const bcrypt = require("bcryptjs");
const session = require("express-session");

const db = require("./db");

const app = express();
const PORT = process.env.PORT || 5000;


// =====================================================
// MIDDLEWARE
// =====================================================

app.use(cors({
    origin: true,
    credentials: true
}));

app.use(express.json());

app.use(express.urlencoded({
    extended: true
}));


// =====================================================
// SESSION
// =====================================================

app.use(session({

    secret: process.env.SESSION_SECRET || "medipredict_day38_secret_key",

    resave: false,

    saveUninitialized: false,

    cookie: {
        maxAge: 1000 * 60 * 60,
        httpOnly: true,
        secure: false
    }

}));


// =====================================================
// LOGIN REQUIRED MIDDLEWARE
// =====================================================

function loginRequired(req, res, next) {

    if (!req.session || !req.session.user) {

        return res.status(401).json({

            success: false,

            message: "Login required"

        });

    }

    next();

}


// =====================================================
// PROTECTED PAGE MIDDLEWARE
// =====================================================

function pageLoginRequired(req, res, next) {

    if (!req.session || !req.session.user) {

        return res.redirect("/login.html");

    }

    next();

}


// =====================================================
// PUBLIC PAGES
// =====================================================

app.get("/", (req, res) => {

    res.sendFile(
        path.join(__dirname, "index.html")
    );

});

app.get("/login.html", (req, res) => {

    res.sendFile(
        path.join(__dirname, "login.html")
    );

});


// =====================================================
// PROTECTED PAGES
// =====================================================

app.get(
    "/dashboard.html",
    pageLoginRequired,
    (req, res) => {

        res.sendFile(
            path.join(__dirname, "dashboard.html")
        );

    }
);


app.get(
    "/health-form.html",
    pageLoginRequired,
    (req, res) => {

        res.sendFile(
            path.join(__dirname, "health-form.html")
        );

    }
);


app.get(
    "/report.html",
    pageLoginRequired,
    (req, res) => {

        res.sendFile(
            path.join(__dirname, "report.html")
        );

    }
);


// =====================================================
// STATIC FILES
// =====================================================

app.use(express.static(__dirname));


// =====================================================
// DAY 37 - REGISTER
// =====================================================

app.post("/api/register", (req, res) => {

    const {
        name,
        email,
        password
    } = req.body;


    if (!name || !email || !password) {

        return res.status(400).json({

            success: false,

            message: "Name, email, and password are required"

        });

    }


    if (password.length < 8) {

        return res.status(400).json({

            success: false,

            message: "Password must be at least 8 characters long"

        });

    }


    const checkSql = "SELECT id FROM users WHERE email = ? LIMIT 1";

    db.query(checkSql, [email], async (err, users) => {

        if (err) {

            console.error("Database check error:", err);

            return res.status(500).json({

                success: false,

                message: "Database error"

            });

        }


        if (users.length > 0) {

            return res.status(400).json({

                success: false,

                message: "An account with this email already exists."

            });

        }


        try {

            const hashedPassword = await bcrypt.hash(password, 10);

            const insertSql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";

            db.query(insertSql, [name, email, hashedPassword], (err, result) => {

                if (err) {

                    console.error("Database insert error:", err);

                    return res.status(500).json({

                        success: false,

                        message: "Failed to create user account"

                    });

                }

                console.log(`✅ User registered successfully: ${email} (ID: ${result.insertId})`);

                res.status(201).json({

                    success: true,

                    message: "Registration successful",

                    userId: result.insertId

                });

            });

        } catch (hashError) {

            console.error("Password hash error:", hashError);

            res.status(500).json({

                success: false,

                message: "Registration failed"

            });

        }

    });

});


// =====================================================
// DAY 38 - LOGIN
// =====================================================

app.post("/api/login", (req, res) => {

    const {
        email,
        password
    } = req.body;


    if (!email || !password) {

        return res.status(400).json({

            success: false,

            message:
                "Email and password are required"

        });

    }


    const sql = `
        SELECT
            id,
            name,
            email,
            password
        FROM users
        WHERE email = ?
        LIMIT 1
    `;


    db.query(
        sql,
        [email],
        async (err, users) => {

            if (err) {

                console.error(
                    "Database error:",
                    err
                );

                return res.status(500).json({

                    success: false,

                    message:
                        "Database error"

                });

            }


            if (users.length === 0) {

                return res.status(401).json({

                    success: false,

                    message:
                        "Invalid email or password"

                });

            }


            const user = users[0];


            try {

                // =========================================
                // COMPARE PASSWORD WITH BCRYPT HASH
                // =========================================

                const passwordMatch =
                    await bcrypt.compare(
                        password,
                        user.password
                    );


                if (!passwordMatch) {

                    return res.status(401).json({

                        success: false,

                        message:
                            "Invalid email or password"

                    });

                }


                // =========================================
                // CREATE SESSION
                // =========================================

                req.session.user = {

                    id: user.id,

                    name: user.name,

                    email: user.email

                };


                console.log(
                    `✅ Login successful: ${user.email}`
                );


                res.json({

                    success: true,

                    message:
                        "Login successful",

                    user: {

                        id: user.id,

                        name: user.name,

                        email: user.email

                    }

                });


            } catch (error) {

                console.error(
                    "Password verification error:",
                    error
                );

                res.status(500).json({

                    success: false,

                    message:
                        "Login failed"

                });

            }

        }
    );

});


// =====================================================
// DAY 38 - CURRENT SESSION
// =====================================================

app.get("/api/session", (req, res) => {

    if (!req.session || !req.session.user) {

        return res.status(401).json({

            success: false,

            loggedIn: false,

            message:
                "No active session"

        });

    }


    res.json({

        success: true,

        loggedIn: true,

        user:
            req.session.user

    });

});


// =====================================================
// DAY 38 - LOGOUT
// =====================================================

app.post("/api/logout", (req, res) => {

    const userEmail =
        (req.session && req.session.user)
            ? req.session.user.email
            : "unknown";


    req.session.destroy((err) => {

        if (err) {

            console.error(
                "Logout error:",
                err
            );

            return res.status(500).json({

                success: false,

                message:
                    "Logout failed"

            });

        }


        res.clearCookie("connect.sid");


        console.log(
            `👋 Logged out: ${userEmail}`
        );


        res.json({

            success: true,

            message:
                "Logout successful"

        });

    });

});


// =====================================================
// DAY 38 - PROTECTED USER INFORMATION
// =====================================================

app.get(
    "/api/me",
    loginRequired,
    (req, res) => {

        res.json({

            success: true,

            user:
                req.session.user

        });

    }
);


// =====================================================
// CREATE REPORT
// =====================================================

app.post(
    "/api/reports",
    loginRequired,
    (req, res) => {

        const {
            report
        } = req.body;


        const email =
            req.session.user.email;

        const name =
            req.session.user.name;


        if (!report) {

            return res.status(400).json({

                success: false,

                message:
                    "Report is required"

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


                if (users.length > 0) {

                    saveReport(
                        users[0].id
                    );

                    return;

                }


                // This should normally not happen
                // because login requires an existing user.

                res.status(404).json({

                    success: false,

                    message:
                        "User not found"

                });

            }
        );

    }
);


// =====================================================
// READ ALL REPORTS
// =====================================================

app.get(
    "/api/reports",
    loginRequired,
    (req, res) => {

        const email =
            req.session.user.email;


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


                res.json({

                    success: true,

                    reports:
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

                        }))

                });

            }
        );

    }
);


// =====================================================
// READ ONE REPORT
// =====================================================

app.get(
    "/api/reports/:id",
    loginRequired,
    (req, res) => {

        const reportId =
            req.params.id;

        const email =
            req.session.user.email;


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

    }
);


// =====================================================
// UPDATE REPORT
// =====================================================

app.put(
    "/api/reports/:id",
    loginRequired,
    (req, res) => {

        const reportId =
            req.params.id;

        const email =
            req.session.user.email;

        const {
            report
        } = req.body;


        if (!report) {

            return res.status(400).json({

                success: false,

                message:
                    "Report is required"

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

    }
);


// =====================================================
// DELETE REPORT
// =====================================================

app.delete(
    "/api/reports/:id",
    loginRequired,
    (req, res) => {

        const reportId =
            req.params.id;

        const email =
            req.session.user.email;


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

    }
);


// =====================================================
// START SERVER
// =====================================================

app.listen(
    PORT,
    () => {

        console.log(
            `🚀 MediPredict Day-38 server running at http://localhost:${PORT}`
        );

        console.log(
            "🔐 Session authentication enabled"
        );

    }
);