import express from "express";
import {login} from "./methods/login.js";
import { dirname } from "path";
import { fileURLToPath } from "url";
import session from 'express-session';
import http from 'http';

//const users = require('./methods/users.json');

var server = express();
const __dirname = dirname(fileURLToPath(import.meta.url));

server.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

server.use(express.json());
server.use(express.urlencoded({ extended: true }));

// app.use((req, res, next) => {
//     const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
//     console.log('Client IP:', ip);
//     const user = Object.values(users).find(user => user.ip === clientIP);
  
//     if (user) {
//         req.user = user; // Attach user object to request
//     }
//     next();
// });

server.listen(9600, () => {
 console.log("Server running on port 9600");
});

server.get("/", (req, res, next) => {
    res.sendFile(__dirname + "/public/login.html");
});

/*
-----------------------------
        Sending Files
-----------------------------
*/ 
server.get('/CSS/login.css', (req, res) => {
    res.sendFile(__dirname + '/public/CSS/login.css', {
        headers: {
            'Content-Type': 'text/css'
        }
    });
});

server.get('/public/Image/dnd-bg.png', (req, res) => {
    res.sendFile(__dirname + '/public/Image/dnd-bg.png', {
        headers: {
            'Content-Type': 'text/css'
        }
    })
})

server.get('/public/JS/login.js', (req, res) => {
    res.sendFile(__dirname + '/public/JS/login.js', {
        headers: {
            'Content-Type': 'text/javascript'
        }
    })
})

/*
-----------------------------
            APIs
-----------------------------
*/ 

server.post("/login", async (req, res, next) => {
    res.json(await login(req.body.uname, req.body.password));
})


