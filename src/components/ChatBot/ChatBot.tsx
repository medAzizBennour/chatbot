import React, { useState, useEffect, useRef, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./ChatBot.css";

import MicIcon from "@mui/icons-material/Mic";
import SettingsVoiceIcon from "@mui/icons-material/SettingsVoice";
import { IconButton } from "@mui/material";

import logo from "../../assets/images/linedata_logo.png";
import io, { Socket } from "socket.io-client";
import { addBotCommand, addUserCommand } from "../../store/actions";

const DOWNSAMPLING_WORKER = "./downsampling_worker.js";

const ChatBot = (): JSX.Element => {
    //     console.log("test");
    const [recording, setRecording] = useState<boolean>(false);
    const socketRef = useRef<Socket | null>(null);
    const mediaStreamRef = useRef<MediaStream | null>(null);
    const mediaStreamSourceRef = useRef<MediaStreamAudioSourceNode | null>(
        null
    );
    const processorRef = useRef<AudioWorkletNode | null>(null);
    const audioContextRef = useRef<AudioContext | null>(null);
    const chunksRef = useRef<Float32Array[]>([]);

    useEffect(() => {
        socketRef.current = io("http://localhost:5000/");
        socketRef.current.on("connect", () => {
            console.log("Connected to server");
        });
        socketRef.current.on("disconnect", () => {
            console.log("Disconnected from server");
        });
        return () => {
            socketRef.current?.disconnect();
        };
    }, []);

    // const createAudioProcessor = (
    //   audioContext: AudioContext,
    //   audioSource: MediaStreamAudioSourceNode
    // ): AudioWorkletNode => {
    //   const downsamplingWorkletNode = new AudioWorkletNode(
    //     audioContext,
    //     'downsampling-processor'
    //   );

    //   const sampleRate = audioSource.context.sampleRate;

    //   downsamplingWorkletNode.port.onmessage = (event) => {
    //     if (socketRef.current?.connected) {
    //       socketRef.current.emit('stream-data', event.data.buffer);
    //     }
    //   };

    //   downsamplingWorkletNode.parameters
    //     ?.get('inputSampleRate')
    //     ?.setValueAtTime(sampleRate, audioContext.currentTime);

    //   audioSource.connect(downsamplingWorkletNode);
    //   downsamplingWorkletNode.connect(audioContext.destination);

    //   return downsamplingWorkletNode;
    // };

    const sendAudioData = async (blob: Blob) => {
        const formData = new FormData();
        formData.append("audio", blob, "recording.wav");
        try {
            const response = await fetch("/upload-audio", {
                method: "POST",
                body: formData,
            });
            if (response.ok) {
                console.log("Audio data sent successfully!");
            } else {
                console.error("Failed to send audio data.");
            }
        } catch (e) {
            console.error("Error sending audio data:", e);
        }
    };

    const startRecording = () => {
        if (!recording) {
            setRecording(true);
            startMicrophone();
        }
    };

    const startMicrophone = async () => {
        audioContextRef.current = new AudioContext();
        await audioContextRef.current.audioWorklet.addModule(
            DOWNSAMPLING_WORKER
        );
        const success = (stream: MediaStream) => {
            console.log("started recording");
            mediaStreamRef.current = stream;
            const sourceNode =
                audioContextRef.current?.createMediaStreamSource(stream);
            if (sourceNode && audioContextRef.current) {
                mediaStreamSourceRef.current = sourceNode;
                processorRef.current = new AudioWorkletNode(
                    audioContextRef.current,
                    "downsampling-processor"
                );
                processorRef.current.port.onmessage = (event) => {
                    // Handle the downsampled audio data
                    const downsampledData = event.data;
                    if (socketRef.current?.connected) {
                        socketRef.current.emit("stream-data", downsampledData);
                    }
                    if (recording) {
                        chunksRef.current.push(downsampledData);
                    }
                };
                mediaStreamSourceRef.current?.connect(processorRef.current);
                processorRef.current.connect(
                    audioContextRef.current.destination
                );
            }
        };

        const fail = (e: Error) => {
            console.error("recording failure", e);
        };

        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices
                .getUserMedia({
                    video: false,
                    audio: true,
                })
                .then(success)
                .catch(fail);
        } else {
            (navigator as any).getUserMedia(
                {
                    video: false,
                    audio: true,
                },
                success,
                fail
            );
        }
    };
    const stopRecording = () => {
        if (recording) {
            processorRef.current?.disconnect();
            mediaStreamSourceRef.current?.disconnect();
            mediaStreamRef.current
                ?.getTracks()
                .forEach((track) => track.stop());
            audioContextRef.current?.close();

            const blob = new Blob(chunksRef.current, { type: "audio/wav" });
            sendAudioData(blob);
        }
    };

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

    return (
        <div className="panel">
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
    );
};

export default ChatBot;
