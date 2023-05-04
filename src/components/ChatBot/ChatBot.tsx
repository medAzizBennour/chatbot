import React, { useState, useEffect, useRef, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./ChatBot.css";

import MicIcon from "@mui/icons-material/Mic";
import SettingsVoiceIcon from "@mui/icons-material/SettingsVoice";

import SendIcon from "@mui/icons-material/Send";

import { IconButton } from "@mui/material";

import logo from "../../assets/images/linedata_logo.png";
import img from "../../assets/images/chatbot.png";

import io, { Socket } from "socket.io-client";
import { addBotCommand, addUserCommand } from "../../store/actions";
import { ReactMic } from "react-mic";
import HelpIcon from "@mui/icons-material/Help";

import RecordRTC from "recordrtc";
import { Comment, Bars } from "react-loader-spinner";
const ChatBot = (): JSX.Element => {
    const [recording, setRecording] = useState(false);
    const [chatOpen, setChatOpen] = useState(false);
    const socketRef = useRef<Socket | null>(null);
    const recorderRef = useRef<RecordRTC | null>(null);
    const [loading, setLoading] = useState(false);
    const [voiceLoading, setVoiceLoading] = useState(false);
    const [transcriptionLoading, setTranscriptionLoading] = useState(false);

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                audio: true,
            });
            setVoiceLoading(true);
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
                        console.log("Audio loaded");
                        socketRef.current?.emit("audio-file", buffer);
                    };
                }
            });
            setRecording(false);
            setVoiceLoading(false);
            setTranscriptionLoading(true);
        } catch (error) {
            console.error("Error stopping recording:", error);
        }
    };
    const dispatch = useDispatch();

    const handleHelperClick = () => {
        socketRef.current?.emit("helper", true);
    };
    useEffect(() => {
        socketRef.current = io("http://localhost:8000/chatbot");
        socketRef.current.on("connect", () => {
            console.log("Chatbot Connected to server");
        });
        socketRef.current.on("disconnect", () => {
            console.log("Disconnected from server");
        });
        socketRef.current.on("transcription_result", (result) => {
            console.log("Transcription result:", result);
            setTranscriptionLoading(false);

            setCommand(result);
            dispatch(addUserCommand(`${result}`));
            setLoading(true);
            setCommand("");
        });

        socketRef.current.on("response-text", (result) => {
            console.log("Transcription response:", result);
            setLoading(false);
            dispatch(addBotCommand(`${result}`));
        });
        socketRef.current.on("disconnect", () => {
            socketRef?.current?.emit("disconnect");
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
    }, [memoDivs, transcriptionLoading, loading]);

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
            setLoading(true);
            setCommand("");
        }
    };

    const toggle = () => {
        const panel = document.querySelector(".panel");

        if (chatOpen) {
            // If chat is currently open, hide the panel
            panel?.classList.remove("open");
            setTimeout(() => {
                setChatOpen(false);
            }, 500); // Wait for the animation to finish before setting chatOpen to false
        } else {
            // If chat is currently closed, show the panel
            setChatOpen(true);
            setTimeout(() => {
                panel?.classList.add("open");
            }, 2); // Delay the adding of the 'open' class to allow for the animation to happen
        }
    };

    return (
        <div className="App">
            <div className="panel">
                <div className="header">
                    <div></div>
                    <div className="header-logo">
                        {" "}
                        <img alt="logo" src={logo} className="logo" />
                    </div>

                    <div className="header-text">
                        <h4
                            className="mt-2"
                            style={{
                                fontFamily: "Roboto",
                                fontSize: "19px",
                                wordSpacing: "1px",
                                letterSpacing: "0.2px",
                            }}
                        >
                            Linedata Voice Assistant
                        </h4>
                    </div>
                    <button onClick={handleHelperClick} className="header-icon">
                        <HelpIcon
                            style={{ fontSize: "20px", color: "white" }}
                        />
                    </button>
                </div>

                <div className="divs-container" ref={divsContainerRef}>
                    {memoDivs.map((memoDiv) => (
                        <div className={memoDiv.type} key={memoDiv.id}>
                            <h4>{memoDiv.text}</h4>
                        </div>
                    ))}
                    {/* <div className="voice-loader"> */}
                    {transcriptionLoading && (
                        <div className="user-command">
                            <Bars
                                height="25"
                                width="25"
                                color="white"
                                visible={transcriptionLoading}
                            />
                        </div>
                    )}

                    <div
                        className="comment-wrapper"
                        style={{ transform: "scaleX(-1)" }}
                    >
                        <Comment
                            visible={loading}
                            height="40"
                            width="40"
                            color="rgba(28, 35, 44, 0.8)"
                        />
                    </div>
                </div>

                <div className="input-container">
                    <div className="text-input">
                        {voiceLoading ? (
                            <div className="sound-wave">
                                {" "}
                                <ReactMic
                                    className="react-mic"
                                    record={recording}
                                    strokeColor="#0d6efd"
                                    backgroundColor="white"
                                />
                            </div>
                        ) : (
                            <textarea
                                style={{
                                    width: "100%",
                                    resize: "none",
                                    height: "90%",
                                    paddingLeft: "5px",
                                    paddingTop: "10px",
                                }}
                                onKeyDown={handleOnKeyDown}
                                onSubmit={handleSubmit}
                                placeholder="Give me a command"
                                onChange={(e) => {
                                    setCommand(e.target.value);
                                }}
                                value={command}
                            />
                        )}
                    </div>
                    <div className="icon-buttons">
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
                        <IconButton
                            onClick={handleSubmit}
                            children={
                                <SendIcon
                                    sx={{
                                        color: "rgb(7, 63, 115) ",
                                        fontSize: "24px",
                                    }}
                                />
                            }
                        />
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
