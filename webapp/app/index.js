import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';


const app = express();
const port = process.env.PORT_WEBAPP || 80;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Servir archivos estáticos de Vite (frontend)
app.use(express.static(path.join(__dirname, 'frontend/dist')));

// Redirect all routes to index.html (para que funcione Vue/React/SPA)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend/dist', 'index.html'));
});
// app.use(cors({
//     origin: 'http://localhost:5173',
//     methods: ['GET', 'POST'],
//     credentials: true
// }));

app.use(express.json());

app.get('/api', async (req, res) => {
    const response = await fetch('http://controller:3000');
    const data = await response.text();
    res.send(data);
    console.log('Request received from:', data);
});

app.get('/api/config', async (req, res) => {
    try {
        console.log('Request received: CONFIG');
        const response = await fetch('http://controller:3000/config');
        const data = await response.json();
        console.log('Data:', data);
        res.json(data);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Error fetching config from controller' });
    }
});

app.post('/api/start', async (req, res) => {

    console.log(`Request received: ${req.body}`);
    console.log(`Request received: ${req}`);
    const response = await fetch('http://controller:3000/start', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(req.body)
    });
    const data = await response.text();
    res.send(data);
});

app.post('/api/stop', async (req, res) => {
    console.log('Request received: STOP');
    const response = await fetch('http://controller:3000/stop', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(req.body)
    });
    const data = await response.text();
    res.send(data);
});

app.listen(port, '0.0.0.0', () => {
    console.log(`RUNNING ON http://webapp:${port}`);
});