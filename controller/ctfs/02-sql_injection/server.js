const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const bodyParser = require("body-parser");
const path = require("path");
const session = require("express-session");




const app = express();
const FLAG = process.env.FLAG || "FLAG_NOT_AVAILABLE";

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({
    secret: "clave_super_secreta",
    resave: false,
    saveUninitialized: false
}));
app.use(express.static(path.join(__dirname, "views")));

const db = new sqlite3.Database("users.db");

db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS users (
          id INTEGER PRIMARY KEY,
          username TEXT UNIQUE,
          password TEXT,
          email TEXT,
          position TEXT,
          access_level TEXT,
          address TEXT,
          note TEXT
        )
      `);

    db.run(`
        INSERT OR IGNORE INTO users 
        (username, password, email, position, access_level, address, note) 
        VALUES 
        ('admin', 'supersecret', 'admin@security.com', 'Administrador de Seguridad', 'Alto', 'Calle Privada 1, Madrid', 'Tiene acceso total al sistema.')
      `);

    db.run(`
        INSERT OR IGNORE INTO users 
        (username, password, email, position, access_level, address, note) 
        VALUES 
        ('user', '1234', 'user@security.com', 'Soporte Técnico', 'Bajo', 'Calle Pública 42, Madrid', 'Solicitó un ascenso')
      `);

});

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "login.html"));
});


app.post("/login", (req, res) => {
    const { username, password } = req.body;
    const query = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`;
    console.log("Ejecutando consulta:", query);

    db.get(query, (err, user) => {
        if (user) {
            req.session.user = user;
            res.redirect(`/welcome`);
        } else {
            // TODO: Add p with error message
            res.send("<script>alert('❌ Usuario o contraseña incorrectos'); window.location.href='/';</script>");
        }
    });

});

app.get("/logout", (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.error("Error destroying session:", err);
            return res.status(500).json({ error: "Logout failed" });
        }
        res.clearCookie("connect.sid");
        res.json({ message: "Logout successful" });
    });
});

app.get("/welcome", (req, res) => {
    if (!req.session.user) {
        return res.redirect("/");
    }
    res.sendFile(path.join(__dirname, "views", "welcome.html"));
});

app.get("/user-data", (req, res) => {
    if (!req.session.user) {
        return res.redirect("/");
    }
    // Evitar enviar contraseña
    const { email, position, access_level, address, note } = req.session.user;
    let username = req.session.user.username;
    if (username == "admin") {
        username = `FLAG = "${FLAG}"`;
    }

    res.json({
        username,
        email,
        position,
        access_level,
        address,
        note
    });
});


app.listen(8080, () => {
    console.log("Running in http://localhost:8080");
});
