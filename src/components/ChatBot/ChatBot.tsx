import React, { useState, useEffect } from "react";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import "./ChatBot.css";
import "@aws-amplify/ui-react/styles.css";
import "@fontsource/inter/variable.css";
import axios from "axios";

import { HiInformationCircle } from "react-icons/hi";
import { Amplify, Auth } from "aws-amplify";
import { AmplifyChatbot } from "@aws-amplify/ui-react/legacy";
import logo from "../../assets/images/linedata_logo.png";
import img from "../../../src/assets/images/chatbot.png";

const client = new W3CWebSocket("ws://127.0.0.1:8000");
Amplify.configure({
    Auth: {
        identityPoolId: "id", // specify the id here otherwise it fails
        region: "us-east-1",
    },
    Interactions: {
        bots: {
            BookTrip: {
                name: "BookTrip",
                alias: "$LATEST",
                region: "us-east-1",
            },
        },
    },
});
let hide = {
    display: "none",
};
let show = {
    display: "block",
};
const MyContentStyles = {
    backgroundColor: "white",
    color: "black",
};

const ChatBot = () => {
    const [modalShow, setModalShow] = useState(false);
    const [chatopen, setChatopen] = useState(false);
    const [inform, setInform] = useState({
        userName: "voiceRevo",
        isLoggedIn: true,
        messages: [],
    });
    const handleClick = () => {
        client.send(
            JSON.stringify({
                type: "action",
                msg: "Modal",
                user: "",
            })
        );
    };
    const handleChatComplete = (event: any) => {
        const { data, err } = event.detail;
        if (data) {
            let parsedData;
            try {
                parsedData = JSON.parse(data.slots);
            } catch (e) {
                parsedData = data.slots;
            }

            if (parsedData.subject) {
                const res = axios.post("http://localhost:3001/api/users", {
                    transcript: parsedData.subject,
                });
            } else if (parsedData.page) {
                if (parsedData.status) {
                    client.send(
                        JSON.stringify({
                            type: "message",
                            msg: parsedData.page,
                            user: data.userName,
                            filter: parsedData.status,
                        })
                    );
                } else {
                    client.send(
                        JSON.stringify({
                            type: "message",
                            msg: parsedData.page,
                            user: data.userName,
                            filter: "",
                        })
                    );
                }
                setInform({ ...data, searchVal: "" });
            } else if (parsedData.destination) {
                console.log(
                    parsedData.destination,
                    parsedData.quantity,
                    parsedData.symbol
                );
                client.send(
                    JSON.stringify({
                        type: "PlacementAdd",
                        destination: parsedData.destination,
                        quantity: parsedData.quantity,
                        symbol: parsedData.symbol,
                    })
                );
            }
        }
        if (err) console.error("Chat failed:", err);
    };

    useEffect(() => {
        const chatbotElement = document.querySelector("amplify-chatbot")!;
        chatbotElement.addEventListener("chatCompleted", handleChatComplete);
        return function cleanup() {
            chatbotElement.removeEventListener(
                "chatCompleted",
                handleChatComplete
            );
        };
    }, []);

    useEffect(() => {
        client.onopen = () => {
            console.log("WebSocket Client Connected");
        };
        client.onmessage = (message: any) => {
            const dataFromServer = message.data;
            console.log("Chatbot!", dataFromServer);
        };
    }, []);

    const toggle = () => {
        setChatopen(!chatopen);
    };

    return (
        <div className="App">
            <div id="chatCon">
                <div className="chat-box" style={chatopen ? show : hide}>
                    <div className="chatbox-header">
                        <img src={logo} />
                        <h5>Linedata voice assistant</h5>
                        <button onClick={handleClick}>
                            <HiInformationCircle className="header-icon" />
                        </button>
                    </div>
                    <AmplifyChatbot
                        id="amplify"
                        botName="BookTrip"
                        botTitle=""
                        welcomeMessage="Hello, how can I help you?"
                        voiceEnabled={true}
                        conversationModeOn={true}
                        textEnabled={true}
                    />
                </div>
                <div className="pop">
                    <div className="button-wrapper">
                        <button
                            onClick={toggle}
                            className="button"
                            type="button"
                        >
                            <img src={img} alt="click her" />
                        </button>
                        <div className="button-bg"></div>
                    </div>
                    {/* <p onClick={toggle}><img onClick={toggle} src={img} alt="click her" /></p> */}
                </div>
            </div>
        </div>
    );
};

export default ChatBot;
