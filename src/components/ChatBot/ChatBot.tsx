import React, { useState, useEffect, useRef, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./ChatBot.css";

import MicIcon from "@mui/icons-material/Mic";
import SettingsVoiceIcon from "@mui/icons-material/SettingsVoice";
import { IconButton } from "@mui/material";

import logo from "../../assets/images/linedata_logo.png";
import img from "../../assets/images/chatbot.png";

import io, { Socket } from "socket.io-client";
import { addBotCommand, addUserCommand } from "../../store/actions";

import RecordRTC from "recordrtc";

const ChatBot = (): JSX.Element => {
    const [recording, setRecording] = useState(false);
    const [chatOpen, setChatOpen] = useState(false);
    const socketRef = useRef<Socket | null>(null);
    const recorderRef = useRef<RecordRTC | null>(null);

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                audio: true,
            });
            recorderRef.current = new RecordRTC(stream, {
                type: "audio",
                mimeType: "audio/wav",
            });
            recorderRef.current?.startRecording();
            setRecording(true);
        } catch (error) {
            console.error("Error starting recording:", error);
        }
    };

    const stopRecording = async () => {
        try {
            recorderRef.current?.stopRecording(() => {
                const blob = recorderRef.current?.getBlob();
                if (blob) {
                    const fileReader = new FileReader();
                    fileReader.readAsArrayBuffer(blob);
                    fileReader.onloadend = () => {
                        const buffer = fileReader.result as ArrayBuffer;
                        socketRef.current?.emit("audio-file", buffer);
                    };
                }
            });
            setRecording(false);
        } catch (error) {
            console.error("Error stopping recording:", error);
        }
    };
    const dispatch = useDispatch();

    useEffect(() => {
        socketRef.current = io("http://localhost:8000/");
        socketRef.current.on("connect", () => {
            console.log("Connected to server");
        });
        socketRef.current.on("disconnect", () => {
            console.log("Disconnected from server");
        });
        socketRef.current.on("transcription_result", (result) => {
            console.log("Transcription result:", result);

            setCommand(result);
            dispatch(addUserCommand(`${result}`));
            setCommand("");
        });

        socketRef.current.on("response", (result) => {
            console.log("Transcription response:", result);
            dispatch(addBotCommand(`${result["response"]}`));
        });

        return () => {
            socketRef.current?.disconnect();
        };
    }, [dispatch]);

    const divs = useSelector((state: any) => state.divs);

    const memoDivs = useMemo(() => [...divs], [divs]);

    const [command, setCommand] = useState("");
    const divsContainerRef = useRef(null);

    useEffect(() => {
        const divsContainer = divsContainerRef.current as HTMLElement | null;
        if (divsContainer) {
            divsContainer.scrollTop = divsContainer.scrollHeight;
        }
    }, [memoDivs]);

    const handleOnKeyDown = (event: {
        key: string;
        preventDefault: () => void;
    }) => {
        if (event.key === "Enter") {
            event.preventDefault();
            handleSubmit();
        }
    };

    const handleSubmit = () => {
        if (command.trim() === "") {
            return;
        } else {
            dispatch(addUserCommand(`${command}`));
            socketRef.current?.emit("text-command", command);
            setCommand("");
        }
    };
    const hide = {
        display: "none",
    };
    const show = {
        display: "block",
    };

    const toggle = () => {
        setChatOpen(!chatOpen);
    };
    return (
        <div className="App">
            <div className="panel" style={chatOpen ? show : hide}>
                <div className="header">
                    <img alt="logo" src={logo} className="logo" />

                    <div className="header-text">
                        <h4 className="mt-2">Linedata Voice Assistant</h4>
                        <p className="intro-header ">
                            You're chatting with Linedata Bot
                        </p>
                    </div>
                </div>

                <div className="divs-container" ref={divsContainerRef}>
                    {memoDivs.map((memoDiv) => (
                        <div className={memoDiv.type} key={memoDiv.id}>
                            <h4>{memoDiv.text}</h4>
                        </div>
                    ))}
                </div>

                <div className="input-container">
                    <div className="text-input">
                        <textarea
                            onKeyDown={handleOnKeyDown}
                            onSubmit={handleSubmit}
                            placeholder="Give me a command"
                            onChange={(e) => {
                                setCommand(e.target.value);
                            }}
                            value={command}
                        />
                    </div>
                    <div>
                        {!recording ? (
                            <IconButton
                                onClick={startRecording}
                                children={
                                    <MicIcon
                                        sx={{
                                            color: "rgb(7, 63, 115) ",
                                            fontSize: "30px",
                                        }}
                                    />
                                }
                            />
                        ) : (
                            <IconButton
                                onClick={stopRecording}
                                children={
                                    <SettingsVoiceIcon
                                        sx={{
                                            color: "rgb(7, 63, 115) ",
                                            fontSize: "30px",
                                        }}
                                    />
                                }
                            />
                        )}
                    </div>
                </div>
            </div>
            <div className="pop">
                <div className="button-wrapper">
                    <button
                        onClick={toggle}
                        className="toggleButton"
                        type="button"
                    >
                        <img src={img} alt="click her" />
                    </button>
                    <div className="toggleButton-bg"></div>
                </div>
                {/* <p onClick={toggle}><img onClick={toggle} src={img} alt="click her" /></p> */}
            </div>
        </div>
    );
};

export default ChatBot;
