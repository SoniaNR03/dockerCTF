const express = require('express');
const app = express();
const path = require('path');
const exec = require('child_process').exec;


app.use(express.urlencoded({ extended: true }));


// Middleware to serve static files
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Process stock check request
app.post('/check_stock', (req, res) => {
    const storeID = "store_" + req.body.storeID;


    const command = `ls /app/data/${storeID}`;

    exec(command, (error, stdout, stderr) => {
        if (error) {
            return res.status(500).send(`<h2>There is no ${storeID}</h2>`);
        }
        return res.send(`
      <h2>Stock ${storeID}:</h2>
      <pre>${stdout}</pre>
    `);
    });
});

// Iniciamos el servidor en el puerto 8080
app.listen(8080, () => {
    console.log('Servidor corriendo en http://localhost:8080');
});
