import fs from 'fs';
import path from 'path';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { CONNREFUSED } from 'dns';

const SECRET_KEY = process.env.JWT_SECRET || "secret";
const USERS_FILE = path.join(process.cwd(), 'users.json'); // Ruta del archivo de usuarios

// Función para leer los usuarios del archivo JSON
function getUsers() {
    if (!fs.existsSync(USERS_FILE)) {
        fs.writeFileSync(USERS_FILE, JSON.stringify({ users: [] }, null, 2));
    }
    return JSON.parse(fs.readFileSync(USERS_FILE, 'utf8')).users;
}

// Función para guardar los usuarios en el archivo JSON
function saveUsers(users) {
    fs.writeFileSync(USERS_FILE, JSON.stringify({ users }, null, 2));
}

// Función para manejar el login o registro
export function loginUser(username, password) {
    let users = getUsers();

    const user = users.find(u => u.username === username);

    if (user) {
        // If the user exists, we check the password
        if (bcrypt.compareSync(password, user.password)) {
            return { token: generateToken(username) };
        } else {
            return { error: "Incorrect Password" };
        }
    } else {
        return { error: "User not found" };
    }
}

export function registerUser(username, password) {
    let users = getUsers();

    const user = users.find(u => u.username === username);

    if (!user) {
        // If the user does not exist, we create it
        const hashedPassword = bcrypt.hashSync(password, 10);
        users.push({ username, password: hashedPassword });
        saveUsers(users);

        return { token: generateToken(username) };
    } else {
        return { error: "User already exists" };
    }
}

// Función para generar un token JWT
export function generateToken(username) {
    return jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
}

// Middleware para verificar el token
export function authenticateToken(req, res, next) {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(401).json({ error: 'No autorizado' });
    }

    jwt.verify(token.split(" ")[1], SECRET_KEY, (err, user) => {
        if (err) {
            return res.status(403).json({ error: 'Invalid token' });
        }
        req.user = user; // Guardamos los datos del usuario en la request
        next();
    });
}

export function verifyToken(req, res) {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        console.log("No token provided");
        return res.status(401).json({ error: 'Not authorized' });
    }

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) {
            console.log("Token verification failed:", err.message);
            return res.status(403).json({ error: 'Invalid Token' });
        }
        console.log("Token verified:", user);
        return res.status(200).json({ user });
    });
}

