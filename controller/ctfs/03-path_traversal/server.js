const express = require("express");
const fs = require("fs");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));


app.use(express.static(path.join(__dirname, "views")));


app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "index.html"));
});


app.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "login.html"));
});


app.get("/file", (req, res) => {
    const filePath = req.query.path;


    const fullPath = path.resolve(filePath);


    if (fs.existsSync(fullPath)) {
        fs.readFile(fullPath, "utf8", (err, data) => {
            if (err) {
                res.status(500).send("Error al leer el archivo.");
            } else {
                res.send(`<pre>${data}</pre>`);
            }
        });
    } else {
        res.status(404).send("Archivo no encontrado.");
    }
});


app.listen(8080, () => {
    console.log("🚀 Servidor corriendo en http://localhost:8080");
});
