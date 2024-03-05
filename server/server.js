const path = require('path');
const express = require('express');
const WebSocket = require('ws');
const cors = require('cors');

const routes = require('./src/routes/routes');

const app = express();
const HTTP_PORT = 5000 || process.env.PORT;
const WS_PORT = 8080;

// Middleware
app.use(cors());
app.use(express.static(path.join(__dirname, '/public')));
app.use('/', routes);

const wss = new WebSocket.Server({ port: WS_PORT }, () => {
    console.log(`WebSocket server listening on port ${WS_PORT}`);
});

wss.on('connection', (ws) => {
    console.log('Client connected');

    ws.on('message', (message) => {
        wss.clients.map((client) => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(message);
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
