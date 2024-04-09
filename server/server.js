require('dotenv').config();
const path = require('path');
const express = require('express');
const WebSocket = require('ws');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');

const db = require('./src/db/db');
const routes = require('./src/routes/routes');
const auth = require('./src/routes/auth');

const app = express();
const HTTP_PORT = 5000 || process.env.PORT;
const WS_PORT = 8080;

// Middleware
app.use(cors());

app.use(express.static(path.join(__dirname, '/public')));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(session({
    secret: `${process.env.SESSION_SECRET}`,
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/', routes);
app.use('/auth', auth);

// Database
mongoose.connect(db.url)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// WebSocket
const wss = new WebSocket.Server({ port: WS_PORT }, () => {
    console.log(`WebSocket server listening on port ${WS_PORT}`);
});

wss.on('connection', (ws) => {
    console.log('Client connected');

    ws.on('message', (message) => {
        wss.clients.forEach((client) => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(message.toString('hex'));
            }
        });
    });

    ws.on('close', () => {
        console.log('Client disconnected');
    });
});

app.listen(HTTP_PORT, () => {
    console.log(`HTTP server listening on port ${HTTP_PORT}`);
});
