import express, { Application } from "express";
import WebSocket from "ws";

const app: Application = express();

const PORT: string | number = process.env.PORT || 5000;

const wss = new WebSocket.Server({ port: 4000 });

wss.on("connection", (ws: WebSocket) => {
    console.log("WebSocket client connected");

    const navigateMmessage = {
        type: "message",
        data: { action: "navigate", parameters: { page: "Orders" } },
    };
    ws.send(JSON.stringify(navigateMmessage));
    const filterMessage = {
        type: "message",
        data: { action: "filter", parameters: { selected: "working" } },
    };
    ws.send(JSON.stringify(filterMessage));
});

app.listen(PORT, () =>
    console.log(` 📡 Backend server: ` + ` Running  on port ${PORT}`)
);
