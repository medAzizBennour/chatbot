import express, { Application } from "express";
import WebSocket from "ws";

const app: Application = express();

const PORT: string | number = process.env.PORT || 5000;

// create a WebSocket server
const wss = new WebSocket.Server({ port: 8000 });

wss.on("connection", (ws: WebSocket) => {
    console.log("WebSocket client connected");

    // send a JSON message to the client
    const message = { type: "message", data: { text: "Hello, client!" } };
    ws.send(JSON.stringify(message));
});

app.listen(PORT, () =>
    console.log(` 📡 Backend server: ` + ` Running  on port ${PORT}`)
);
