import express from 'express';
import fs from 'fs';
import { createContainer, deleteContainerByLabel, deleteContainerByUser, checkFlag, deleteAllContainers } from './ctfManager.js';
import { authenticateToken, loginUser, registerUser, verifyToken } from './auth.js';

const app = express();
const port = process.env.PORT_CONTROLLER || 3000;

app.use(express.json());

app.get('/', (req, res) => {
    console.log('Request received from:', req.ip);
    res.send('Controller response');
});

app.post('/auth/login', (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: "User or Password Missing" });
    }

    const result = loginUser(username, password);

    if (result.error) {
        return res.status(401).json({ error: result.error });
    }

    res.json(result);
});

app.post('/auth/register', (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: "User or Password Missing" });
    }
    //TODO: CHECK
    if (username.includes(" ")) {
        return res.status(400).json({ error: "User cannot contain spaces" });
    }

    const result = registerUser(username, password);

    if (result.error) {
        return res.status(401).json({ error: result.error });
    }
    console.log('User registered:', username);
    res.json(result);
});

app.get('/auth/verify', verifyToken);


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

app.post('/start', authenticateToken, async (req, res) => {

    console.log('Starting CTF:', req.body.ctfId);

    const hostPort = await createContainer(req.body.ctfId, req.userId);
    console.log('Request received from:', hostPort);
    res.send(hostPort);
});

app.post('/stop', authenticateToken, async (req, res) => {
    console.log("Stopping CTF:", req.body.ctfId);
    const done = await deleteContainerByLabel(req.body.ctfId, req.userId);
    res.send(done);
});

app.post('/stopAll', authenticateToken, async (req, res) => {
    const done = await deleteContainerByUser(req.userId);
    res.send(done);
});

app.post('/checkFlag', authenticateToken, (req, res) => {
    const { ctfId, flag } = req.body;
    const userId = req.userId;
    console.log('Checking flag:', ctfId, userId, flag);
    checkFlag(ctfId, userId, flag)
        .then((result) => {
            console.log('Flag check result:', result);
            res.send(result);
        })
        .catch((error) => {
            console.error('Error checking flag:', error);
            res.status(500).send(error);
        });
});

process.once('SIGTERM', () => {
    console.log('SIGTERM signal received: closing HTTP server');
    deleteAllContainers()
        .then(() => {
            console.log('All containers deleted');
        })
        .catch((error) => {
            console.error('Error deleting containers:', error);
        });
    process.exit(0);
});

app.listen(port, '0.0.0.0', () => {
    console.log(`RUNNING ON http://controller:${port}`);
});