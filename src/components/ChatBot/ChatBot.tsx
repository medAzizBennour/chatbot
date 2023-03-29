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

const ChatBot = (): JSX.Element => {
    const [recording, setRecording] = useState(false);
    const [chatOpen, setChatOpen] = useState(false);
    const socketRef = useRef<Socket | null>(null);
    const mediaStreamRef = useRef<MediaStream | null>(null);
    const chunksRef = useRef<Float32Array[]>([]);
    const audioContextRef = useRef<AudioContext | null>(null);

    const startRecording = async () => {
        try {
            mediaStreamRef.current = await navigator.mediaDevices.getUserMedia({
                video: false,
                audio: true,
            });
            audioContextRef.current = new AudioContext();

            // Register the audio worklet module and check if it is loaded successfully
            await audioContextRef.current.audioWorklet
                .addModule("downsample-processor.js")

                .catch((error) => {
                    console.error("Error loading DownsampleProcessor:", error);
                });

            const workletNode = new AudioWorkletNode(
                audioContextRef.current,
                "downsample-processor"
            );

            workletNode.port.onmessage = (event) => {
                const downsampledData = event.data;
                console.log("test");
                if (socketRef.current?.connected) {
                    socketRef.current.emit("stream-data", downsampledData);
                    console.log("Sent Audio");
                }
                if (recording) {
                    chunksRef.current.push(downsampledData);
                }
            };

            const sourceNode = audioContextRef.current.createMediaStreamSource(
                mediaStreamRef.current
            );
            sourceNode.connect(workletNode);
            workletNode.connect(audioContextRef.current.destination);
            setRecording(true);
        } catch (error) {
            console.error("Error starting recording:", error);
        }
    };

    const stopRecording = () => {
        if (!recording) return;
        mediaStreamRef.current?.getTracks().forEach((track) => track.stop());
        audioContextRef.current?.close();
        const blob = new Blob(chunksRef.current, { type: "audio/wav" });
        console.log(blob);
        const fileReader = new FileReader();
        fileReader.onload = () => {
            const arrayBuffer = fileReader.result;
            console.log(arrayBuffer);
            socketRef.current?.emit("stream-data", arrayBuffer);
            console.log("Audio sent successfully");
        };
        fileReader.readAsArrayBuffer(blob);
        setRecording(false);
    };

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
        });
        return () => {
            socketRef.current?.disconnect();
        };
    }, []);

    const divs = useSelector((state: any) => state.divs);

    const memoDivs = useMemo(() => [...divs], [divs]);
    const dispatch = useDispatch();

    const commands = [
        {
            pattern: /(search|look) for (.+)/i,
            command: (option: String, term: String) => {
                window.open(`https://www.google.com/search?q=${term}`);
            },
        },

        {
            pattern: /(go|navigate) to (.+)/i,
            command: (option: String, website: String) =>
                window.open(`https://${website}.com`),
        },
        {
            pattern: /click on button (1|2)/i,
            command: (option: String) => {
                const button = document.querySelector(
                    `button:nth-of-type(${option})`
                ) as HTMLButtonElement;
                console.log("button");
                button?.click();
            },
        },
    ];

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

    const executeCommand = (command: String) => {
        const matchingCommand = commands.find((cmd) =>
            command.match(cmd.pattern)
        );
        if (matchingCommand) {
            dispatch(addBotCommand(`Okay I will ${command}.`));
            const args = command.match(matchingCommand.pattern);
            if (args) matchingCommand.command(args[1], args[2]);
        } else {
            dispatch(addBotCommand(`Sorry, I didn't understand your command.`));
        }
    };

    const handleSubmit = () => {
        if (command.trim() === "") {
            return;
        } else {
            dispatch(addUserCommand(`${command}`));
            executeCommand(command);
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
