const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const FLAG = process.env.FLAG || "FLAG_NOT_AVAILABLE";

app.use(bodyParser.urlencoded({ extended: true }));

// Static files
app.use(express.static(path.join(__dirname, "views")));

// Connect to the database
const db = new sqlite3.Database("users.db");

// Create the users table and insert some users
db.serialize(() => {
    db.run("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, username TEXT, password TEXT)");
    db.run("INSERT OR IGNORE INTO users (username, password) VALUES ('admin', 'supersecret')");
    db.run("INSERT OR IGNORE INTO users (username, password) VALUES ('user', '1234')");
});

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.get("/flag", (req, res) => {
    res.json({ flag: FLAG });
});

app.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "login.html"));
});

app.post("/login", (req, res) => {
    const { username, password } = req.body;

    // Vulnerable to SQL Injection
    const query = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`;
    console.log("Executing query:", query);

    db.get(query, (err, user) => {
        if (user && user.username === "admin") {
            res.redirect(`/welcome?username=${user.username}`);//FIXME: Wellcome for each user
        } else {
            res.send("<script>alert('Incorrect password or user'); window.location.href='/login';</script>");
        }
    });
});

app.get("/welcome", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "welcome.html"));
});

app.listen(8080, () => {
    console.log("Running in http://localhost:8080");
});
