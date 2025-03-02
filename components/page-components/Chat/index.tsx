"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { IoSend } from "react-icons/io5";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";
import { ChatProps } from "./Chat.props";
import { Skeleton } from "./Skeleton";
import { useTranslations } from "next-intl";
import { useMessages } from "@/hooks/useMessages";
import { FaTrashAlt } from "react-icons/fa";

export const ChatPageComponent = ({ profile }: ChatProps) => {
    const {
        messages,
        loading,
        setLoading,
        isSending,
        sendMessage,
        messageInput,
        setMessageInput,
        cleanChatHistory,
    } = useMessages(profile);

    const messagesEndRef = useRef<HTMLDivElement | null>(null);

    const t = useTranslations("Home");

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            const form = e.currentTarget.form;
            if (form) form.requestSubmit();
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
        <div className="mt-8 bg-secondary-light xsm:p-6 p-4 rounded-md text-primary min-h-[85vh]">
            <h1>{t("ai-helper")}</h1>
            <div className="flex flex-col mt-6 max-w-4xl mx-auto">
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
                                      className={`p-3 rounded-lg max-w-xl ${
                                          msg.sender === profile.firstName ||
                                          msg.sender === "User"
                                              ? "bg-secondary-dark ml-auto text-right"
                                              : "bg-secondary-light"
                                      }`}
                                  >
                                      <div
                                          className={`flex text-primary text-sm gap-1 ${
                                              msg.sender ===
                                                  profile.firstName ||
                                              msg.sender === "User"
                                                  ? "justify-end"
                                                  : "justify-start"
                                          }`}
                                      >
                                          <div className="font-bold">
                                              {msg.sender}:
                                          </div>
                                          <div>{msg.sentAt}</div>
                                      </div>
                                      <div className="text-primary mt-1 break-words">
                                          {msg.message}
                                      </div>
                                  </motion.div>
                              ))}
                    </div>
                    <div ref={messagesEndRef} />
                </motion.div>
                <div className="relative mt-4 border-t border-secondary pt-3">
                    <form onSubmit={sendMessage}>
                        <Textarea
                            placeholder={t("type-message")}
                            className="w-full p-3 mb-16 text-primary rounded-lg outline-none min-h-[150px]"
                            value={messageInput}
                            onChange={(e) => setMessageInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                        />
                        <Button
                            color="redBorder"
                            className="absolute left-3 bottom-4 p-1 bg-red text-white hover:text-gray-light"
                            disabled={isSending}
                            type="button"
                            onClick={cleanChatHistory}
                        >
                            <FaTrashAlt size={20} />
                            {t("clean-chat")}
                        </Button>
                        <Button
                            color="purpleBackground"
                            className="absolute right-4 bottom-4 rounded-full w-12 h-12 p-2"
                            disabled={isSending}
                            type="submit"
                            name="Send message"
                            aria-label="Send message"
                        >
                            {isSending ? (
                                <AiOutlineLoading3Quarters className="text-white animate-spin size-6" />
                            ) : (
                                <IoSend className="text-white size-6" />
                            )}
                        </Button>
                    </form>
                </div>
                <div className="mt-4 text-xs text-gray-dark">
                    <div>{t("task-examples")}:</div>
                    <div className="flex flex-wrap gap-2 mt-2">
                        <Button
                            color="purpleBorder"
                            className="p-2 bg-secondary border-secondary rounded text-gray-dark"
                            onClick={() =>
                                setMessageInput(
                                    "Створити дошку з назвою 'Дошка'",
                                )
                            }
                        >
                            {t("create-board")}
                        </Button>
                        <Button
                            color="purpleBorder"
                            className="p-2 bg-secondary border-secondary rounded text-gray-dark"
                            onClick={() =>
                                setMessageInput(
                                    "Додати картку в список 'Завдання'",
                                )
                            }
                        >
                            {t("create-task")}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};
