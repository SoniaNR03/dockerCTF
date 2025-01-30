require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 80;

app.get('/', (req, res) => {
    res.send('DOCKER WEBAPP WORKING');
});

app.listen(port, () => {
    console.log(`RUNNING ON http://localhost:${port}`);
});