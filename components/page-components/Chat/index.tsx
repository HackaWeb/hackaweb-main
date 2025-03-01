"use client";

import { useState, useEffect, useRef } from "react";
import * as signalR from "@microsoft/signalr";
import { motion } from "framer-motion";
import { IoSend } from "react-icons/io5";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";
import { ChatProps } from "./Chat.props";
import { Skeleton } from "./Skeleton";

export const ChatPageComponent = ({ profile }: ChatProps) => {
    const [connection, setConnection] = useState<signalR.HubConnection | null>(
        null,
    );
    const [messageInput, setMessageInput] = useState("");
    const [messages, setMessages] = useState<
        { sender: string; text: string; sentAt: string }[]
    >([]);
    const [isSending, setIsSending] = useState(false);
    const [loading, setLoading] = useState(true);
    const messagesEndRef = useRef<HTMLDivElement | null>(null);

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
                    setMessages((prev) => [...prev]);
                    loadChatHistory();

                    connection.on(
                        "ReceiveResponse",
                        (serverResponse: string) => {
                            console.log(serverResponse);
                            setMessages((prev) => [
                                ...prev,
                                {
                                    sender: "Server",
                                    text: serverResponse,
                                },
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

    const loadChatHistory = async () => {
        if (connection) {
            try {
                const history = await connection.invoke("LoadChatHistory");
                console.log("Історія чату: ", history);
                setMessages((prev) => [...prev, ...history]);
                setLoading(false);
            } catch (error) {
                console.error("Помилка при завантаженні історії чату: ", error);
                setLoading(false);
            }
        }
    };
    console.log(messages);

    const sendMessage = async () => {
        if (connection && messageInput.trim()) {
            setIsSending(true);
            setMessageInput("");
            try {
                await connection.invoke("SendMessage", messageInput);
                setMessages((prev) => [
                    ...prev,
                    {
                        sender: profile.firstName || "Користувач",
                        text: messageInput,
                    },
                ]);
            } catch (error) {
                console.error("Помилка при надсиланні повідомлення: ", error);
            } finally {
                setIsSending(false);
            }
        }
    };

    useEffect(() => {
        if (messages.length > 0) {
            setLoading(false);
        }

        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    return (
        <div className="mt-8 bg-secondary-light xsm:p-6 p-4 rounded-md text-primary max-w-4xl mx-auto">
            <h1>AI помічник</h1>
            <div className="flex flex-col mt-6">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="w-full bg-secondary-light p-4 rounded-lg h-[500px] overflow-y-auto"
                >
                    <div className="flex flex-col space-y-3">
                        {loading
                            ? Array.from({ length: 5 }).map((_, index) => (
                                  <Skeleton key={index} />
                              ))
                            : messages.map((msg, index) => (
                                  <motion.div
                                      key={index}
                                      initial={{ opacity: 0, y: 10 }}
                                      animate={{ opacity: 1, y: 0 }}
                                      className={`p-3 rounded-lg max-w-fit ${
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
                    <div ref={messagesEndRef} />
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
                        disabled={isSending}
                    >
                        {isSending ? (
                            <AiOutlineLoading3Quarters className="text-white animate-spin size-6" />
                        ) : (
                            <IoSend className="text-white size-6" />
                        )}
                    </Button>
                </div>
            </div>
        </div>
    );
};
