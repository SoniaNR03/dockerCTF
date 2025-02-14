const express = require('express');

const app = express();
const port = process.env.PORT_CONTROLLER || 3000;

app.get('/', (req, res) => {
    console.log('Request received from:', req.ip);
    res.send('Controller response');
});

app.post('/', (req, res) => {
    res.send('POST response from controller');
});

app.listen(port, '0.0.0.0', () => {
    console.log(`RUNNING ON http://controller:${port}`);
});