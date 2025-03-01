"use client";

import { useState, useRef } from "react";
import { AiFillMessage } from "react-icons/ai";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes } from "react-icons/fa";
import { Button } from "@/components/ui/Button";
import { onOutsideClick } from "@/helpers/onOutsideClick";

const initialMessages = [
    {
        id: 1,
        title: "New Message",
        text: "Hey, how are you?",
        time: "12:00",
        isRead: false,
    },
    {
        id: 2,
        title: "System Alert",
        text: "Your password expires soon.",
        time: "10:45",
        isRead: false,
    },
    {
        id: 3,
        title: "Reminder",
        text: "Meeting at 3:00 PM",
        time: "09:30",
        isRead: true,
    },
    {
        id: 4,
        title: "Promotion",
        text: "Special offer just for you!",
        time: "08:15",
        isRead: false,
    },
    {
        id: 5,
        title: "Friend Request",
        text: "Alex sent you a friend request.",
        time: "Yesterday",
        isRead: true,
    },
];

export const Messages = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState(initialMessages);
    const menuRef = useRef<HTMLDivElement>(null);

    onOutsideClick(menuRef, () => setIsOpen(false));

    const markAsRead = (id: number) => {
        setMessages((prev) =>
            prev.map((msg) => (msg.id === id ? { ...msg, isRead: true } : msg)),
        );
    };

    return (
        <div className="relative" ref={menuRef}>
            <button
                aria-label="Messages"
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 bg-secondary rounded-md w-12 h-12 flex items-center justify-center shadow-lg transition hover:bg-secondary-light"
            >
                <div className="relative">
                    <AiFillMessage className="text-purple size-6" />
                    {messages.some((msg) => !msg.isRead) && (
                        <div className="absolute rounded-full bg-yellow w-2 h-2 -top-[2px] -right-[2px]"></div>
                    )}
                </div>
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-0 xsm:right-0 mt-2 w-[280px] xsm:w-80 bg-[#444146] rounded-md shadow-lg overflow-hidden z-10"
                    >
                        <div className="flex justify-between items-center p-4 bg-secondary-dark bg-opacity-100 text-white">
                            <span className="font-semibold">Notifications</span>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-gray-400 hover:text-white"
                            >
                                <FaTimes />
                            </button>
                        </div>
                        <ul className="max-h-80 overflow-y-auto">
                            <AnimatePresence>
                                {messages.length ? (
                                    messages.map((msg) => (
                                        <motion.li
                                            key={msg.id}
                                            initial={{ opacity: 0, y: 100 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: 20 }}
                                            transition={{ duration: 0.3 }}
                                            className={`p-4 border-b border-gray-800 hover:bg-secondary cursor-pointer transition ${
                                                !msg.isRead
                                                    ? "font-semibold"
                                                    : ""
                                            }`}
                                            onClick={() => markAsRead(msg.id)}
                                        >
                                            <div className="flex justify-between">
                                                <span
                                                    className={
                                                        !msg.isRead
                                                            ? "text-yellow"
                                                            : "text-white"
                                                    }
                                                >
                                                    {msg.title}
                                                </span>
                                                <span className="text-white text-sm">
                                                    {msg.time}
                                                </span>
                                            </div>
                                            <p className="text-white text-sm mt-1">
                                                {msg.text}
                                            </p>
                                        </motion.li>
                                    ))
                                ) : (
                                    <motion.li
                                        initial={{ opacity: 0, y: 100 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 20 }}
                                        transition={{ duration: 0.3 }}
                                        className="mt-2 text-center text-gray mb-2"
                                    >
                                        No new messages
                                    </motion.li>
                                )}
                            </AnimatePresence>
                        </ul>
                        {messages.length ? (
                            <Button
                                className="mt-3 text-sm mx-auto py-2 mb-2 text-white"
                                color="purpleBorder"
                                onClick={() => setMessages([])}
                            >
                                Read All
                            </Button>
                        ) : (
                            ""
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
