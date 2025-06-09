import fs from 'fs';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const SECRET_KEY = process.env.JWT_SECRET || "secret";
const USERS_FILE = "/config/users.json";

// Read the users from the JSON file
function getUsers() {
    if (!fs.existsSync(USERS_FILE)) {
        fs.writeFileSync(USERS_FILE, JSON.stringify({ users: [] }, null, 2));
    }
    return JSON.parse(fs.readFileSync(USERS_FILE, 'utf8')).users;
}

// Write the users to the JSON file
function saveUsers(users) {
    fs.writeFileSync(USERS_FILE, JSON.stringify({ users }, null, 2));
}

// Manage user login and registration
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

// Function to register a new user
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

// Function to generate a JWT token
export function generateToken(username) {
    return jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
}

// Middleware to authenticate the token
export function authenticateToken(req, res, next) {
    const token = req.headers['authorization']?.split(' ')[1];  // The token comes from the header "Authorization"

    if (!token) {
        return res.status(403).send('Token is required');
    }

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(403).send('Invalid or expired token');
        }
        req.userId = decoded.username;
        next();
    });
}

// Function to verify the token
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

