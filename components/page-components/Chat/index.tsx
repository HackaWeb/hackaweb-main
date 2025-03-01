"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { IoSend, IoArrowBack } from "react-icons/io5";
import { AiOutlineUser } from "react-icons/ai";
import Image from "next/image";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";
import { Chat, ChatProps } from "./Chat.props";

export const ChatPageComponent = ({ chats, profile }: ChatProps) => {
    const [selectedChat, setSelectedChat] = useState<Chat | null>(
        chats[0] || null,
    );
    const [messageInput, setMessageInput] = useState("");

    const sendMessage = () => {
        if (messageInput.trim() === "" || !selectedChat) return;

        const newMessage = {
            sender: profile,
            text: messageInput,
            createdAt: new Date().toLocaleString(),
        };

        setSelectedChat((prev) =>
            prev ? { ...prev, messages: [...prev.messages, newMessage] } : null,
        );
        setMessageInput("");
    };

    return (
        <div className="mt-8 bg-secondary-light xsm:p-6 p-2 rounded-md text-primary">
            <h1 className="text-primary">Чати</h1>
            <div className="flex flex-col md:flex-row h-[800px] bg-secondary-light mt-6">
                <motion.div
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    className="w-full md:w-1/4 bg-secondary-light xsm:p-6 p-2 shadow-lg overflow-y-auto"
                >
                    <ul className="space-y-3">
                        {chats.map((chat) => (
                            <li
                                key={chat.id}
                                className={`flex items-center xsm:gap-3 gap-2 xsm:p-3 p-2 rounded-lg cursor-pointer transition hover:bg-secondary ${
                                    selectedChat?.id === chat.id
                                        ? "bg-secondary"
                                        : ""
                                }`}
                                onClick={() => setSelectedChat(chat)}
                            >
                                <div className="xsm:w-12 xsm:h-12 h-8 w-8 border-purple border-2 rounded-md overflow-hidden flex justify-center items-center">
                                    {chat.user.avatarUrl ? (
                                        <Image
                                            src={chat.user.avatarUrl}
                                            alt={`${chat.user.firstName} ${chat.user.lastName}`}
                                            width={48}
                                            height={48}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <AiOutlineUser className="text-purple xsm:size-6 size-4" />
                                    )}
                                </div>
                                <span className="text-lg md:text-xl">
                                    {chat.user.firstName} {chat.user.lastName}
                                </span>
                            </li>
                        ))}
                    </ul>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="w-full md:w-3/4 flex flex-col xsm:p-6 p-4"
                >
                    {selectedChat ? (
                        <>
                            <div className="border-b border-gray-800 pb-3 flex items-center">
                                <div className="xsm:w-12 xsm:h-12 h-9 w-9 border-purple border-2 rounded-md overflow-hidden flex justify-center items-center mr-3">
                                    {selectedChat.user.avatarUrl ? (
                                        <Image
                                            src={selectedChat.user.avatarUrl}
                                            alt={`${selectedChat.user.firstName} ${selectedChat.user.lastName}`}
                                            width={48}
                                            height={48}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <AiOutlineUser className="text-purple xsm:size-8 size-6" />
                                    )}
                                </div>
                                <div className="text-lg sm:text-2xl md:text-3xl font-semibold">
                                    {selectedChat.user.firstName}{" "}
                                    {selectedChat.user.lastName}
                                </div>
                            </div>
                            <div className="flex-1 overflow-y-auto xsm:mt-4 mt-2 space-y-3 xsm:p-4 p-2 bg-secondary-light rounded-lg">
                                {selectedChat.messages.map((msg, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className={`xsm:p-3 p-2 rounded-lg xsm:max-w-xs max-w-40 ${
                                            msg.sender.id === profile.id
                                                ? "bg-secondary-dark ml-auto text-right"
                                                : "bg-secondary-light"
                                        }`}
                                    >
                                        <p className="xsm:text-base text-sm">
                                            {msg.text}
                                        </p>
                                    </motion.div>
                                ))}
                            </div>
                            <div className="xsm:mt-4 mt-2 flex xsm:flex-row flex-col items-center border-t gap-2 xsm:gap-0 border-gray-800 pt-3">
                                <Textarea
                                    placeholder="Напишіть повідомлення..."
                                    className="flex-1 p-3 text-white rounded-lg outline-none min-h-24 xsm:min-h-0"
                                    value={messageInput}
                                    onChange={(e) =>
                                        setMessageInput(e.target.value)
                                    }
                                    onKeyDown={(e) =>
                                        e.key === "Enter" && sendMessage()
                                    }
                                />
                                <Button
                                    color="purpleBackground"
                                    className="ml-3 rounded-full xsm:w-14 xsm:h-14 w-10 h-10 p-2"
                                    onClick={sendMessage}
                                >
                                    <IoSend className="text-white size-6" />
                                </Button>
                            </div>
                        </>
                    ) : (
                        <p className="text-center text-gray-400 xsm:mt-8 mt-6">
                            Виберіть чат для початку розмови
                        </p>
                    )}
                </motion.div>
            </div>
        </div>
    );
};
