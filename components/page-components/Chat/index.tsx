"use client";

import { useState, useEffect } from "react";
import * as signalR from "@microsoft/signalr";
import { motion } from "framer-motion";
import { IoSend } from "react-icons/io5";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";
import { ChatProps } from "./Chat.props";

export const ChatPageComponent = ({ profile }: ChatProps) => {
    const [connection, setConnection] = useState<signalR.HubConnection | null>(
        null,
    );
    const [messageInput, setMessageInput] = useState("");
    const [messages, setMessages] = useState<
        { sender: string; text: string }[]
    >([]);
    console.log(messages);

    useEffect(() => {
        const hubUrl = process.env.NEXT_PUBLIC_CHAT_HUB_URL as string;
        const newConnection = new signalR.HubConnectionBuilder()
            .withUrl(hubUrl)
            .withAutomaticReconnect()
            .build();

        setConnection(newConnection);
    }, []);

    useEffect(() => {
        if (connection) {
            connection
                .start()
                .then(() => {
                    console.log("Connected to ChatHub!");

                    connection.on(
                        "ReceiveResponse",
                        (serverResponse: string) => {
                            setMessages((prev) => [
                                ...prev,
                                { sender: "Server", text: serverResponse },
                            ]);
                        },
                    );

                    connection.on("ReceiveSystemMessage", (sysMsg: string) => {
                        setMessages((prev) => [
                            ...prev,
                            { sender: "System", text: sysMsg },
                        ]);
                    });
                })
                .catch((error) =>
                    console.error("Не вдалося підключитись: ", error),
                );
        }
    }, [connection]);

    const sendMessage = async () => {
        if (connection && messageInput.trim()) {
            try {
                await connection.invoke("SendMessage", messageInput);
                setMessages((prev) => [
                    ...prev,
                    {
                        sender: profile.firstName || "Користувач",
                        text: messageInput,
                    },
                ]);
                setMessageInput("");
            } catch (error) {
                console.error("Помилка при надсиланні повідомлення: ", error);
            }
        }
    };

    return (
        <div className="mt-8 bg-secondary-light xsm:p-6 p-4 rounded-md text-primary max-w-4xl mx-auto">
            <h1>AI помічник</h1>
            <div className="flex flex-col mt-6">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="w-full bg-secondary-light p-4 rounded-lg h-[450px] overflow-y-auto"
                >
                    <div className="flex flex-col space-y-3">
                        {messages.map((msg, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={`p-3 rounded-lg max-w-[600px] ${
                                    msg.sender === profile.firstName ||
                                    msg.sender === "Користувач"
                                        ? "bg-secondary-dark ml-auto text-right"
                                        : "bg-secondary-light"
                                }`}
                            >
                                <div className="text-gray-500 text-sm">
                                    {msg.sender}:
                                </div>
                                <div className="text-base mt-1 break-words">
                                    {msg.text}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
                <div className="relative mt-4 border-t border-gray-800 pt-3">
                    <Textarea
                        placeholder="Напишіть повідомлення..."
                        className="w-full p-3 text-white rounded-lg outline-none min-h-[200px]"
                        value={messageInput}
                        onChange={(e) => setMessageInput(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                    />
                    <Button
                        color="purpleBackground"
                        className="absolute right-4 bottom-4 rounded-full w-12 h-12 p-2"
                        onClick={sendMessage}
                    >
                        <IoSend className="text-white size-6" />
                    </Button>
                </div>
            </div>
        </div>
    );
};
