import express from "express";
import cors from "cors";
import { login } from "../methods/login.js";
import { dirname } from "path";
import { fileURLToPath } from "url";
import session from 'express-session';
import http from 'http';

const server = express();
const __dirname = dirname(fileURLToPath(import.meta.url));

// Middleware setup
server.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

server.use(cors());
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

// Error handling middleware
server.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Start server
server.listen(9600, () => {
    console.log("Server running on port 9600");
});

// Static file serving
server.get("/", (req, res) => {
    res.sendFile(__dirname + "/../public/login.html");
});

server.get("/api/test", (req, res) => {
    res.sendFile(__dirname + '/../Classes/bruiser.json', {
        headers: {
            'Content-Type': 'application/json'
        }
    });
});

// API routes
server.post("/login", async (req, res) => {
    try {
        const result = await login(req.body.uname, req.body.password);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

server.post("/create-campaign", async (req, res) => {
    try {
        res.json({ 'Hello': 'World!' });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default server;
