require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('DOCKER CONTROLLER WORKING');
});

app.listen(port, () => {
    console.log(`RUNNING ON http://localhost:${port}`);
});