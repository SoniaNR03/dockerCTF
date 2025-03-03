import express from 'express';
import fs from 'fs';
import { createContainer, deleteContainerByLabel } from './ctfManager.js';



const app = express();
const port = process.env.PORT_CONTROLLER || 3000;

app.use(express.json());

app.get('/', (req, res) => {
    console.log('Request received from:', req.ip);
    res.send('Controller response');
});

app.get('/config', (req, res) => {
    console.log('Request received: CONFIG');
    try {
        const frontend_config = JSON.parse(fs.readFileSync('/app/frontend_config.json', 'utf8'));
        console.log('Frontend config:', frontend_config);
        res.json(frontend_config);
    } catch (error) {
        console.error('Error reading file:', error);
        res.status(500).json({ error: 'Could not read configuration file' });
    }
});

app.post('/start', async (req, res) => {
    // const ctfId = req.body.ctfId;
    console.log('Starting CTF:', req.body.ctfId);
    const hostPort = await createContainer(req.body.ctfId, req.body.userId, process.env.FLAG);
    console.log('Request received from:', hostPort);

    res.send(hostPort);
});

app.post('/stop', async (req, res) => {
    console.log("Stopping CTF:", req.body.ctfId);
    const hostPort = await deleteContainerByLabel(req.body.ctfId, req.body.userId);
    console.log('Request received from:', hostPort);
    res.send(hostPort);
});

app.listen(port, '0.0.0.0', () => {
    console.log(`RUNNING ON http://controller:${port}`);
});