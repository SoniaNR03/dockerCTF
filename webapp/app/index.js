import express from 'express';
import cors from 'cors';

const app = express();
const port = process.env.PORT_WEBAPP || 80;

app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
    credentials: true
}));

app.get('/api', async (req, res) => {
    const response = await fetch('http://controller:3000');
    const data = await response.text();
    res.send(data);
    // res.json(data);
    console.log('Request received from:', data);
});

app.listen(port, '0.0.0.0', () => {
    console.log(`RUNNING ON http://webapp:${port}`);
});