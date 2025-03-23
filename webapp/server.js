import "dotenv/config";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = process.env.PORT_WEBAPP || 80;
const CONTROLLER_PORT = process.env.PORT_CONTROLLER || 3000;
const CONTROLLER_URL = `http://controller:${CONTROLLER_PORT}`; // Internal docker network
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Static files
app.use(express.static(path.join(__dirname, "public")));

// Proxy that redirects `/api/` to `controller`
app.use(express.json());
app.use("/api/", async (req, res) => {
    try {
        const response = await fetch(`${CONTROLLER_URL}${req.path}`, {
            method: req.method,
            headers: { ...req.headers },
            body: req.method !== "GET" ? JSON.stringify(req.body) : undefined,
        });
        const data = await response.json();
        res.status(response.status).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Redirect all routes to index.html
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => console.log(`Webapp running in http://localhost:${PORT}`));
