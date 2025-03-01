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

export const ChatPageComponent = ({ profile }: ChatProps) => {
    const {
        messages,
        loading,
        setLoading,
        isSending,
        sendMessage,
        messageInput,
        setMessageInput,
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
        console.log(messages);
    }, [messages]);

    return (
        <div className="mt-8 bg-secondary-light xsm:p-6 p-4 rounded-md text-primary min-h-[87vh]">
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
                                      <div className="text-primary font-bold text-sm">
                                          {msg.sender}:
                                      </div>
                                      <div className="text-primary mt-1 break-words">
                                          {msg.message}
                                      </div>
                                      <div className="text-primary mt-1 break-words text-xs font-semibold text-right">
                                          {msg.sentAt}
                                      </div>
                                  </motion.div>
                              ))}
                        {messages.map((msg, index) => (
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
                                <div className="text-primary font-bold text-sm">
                                    {msg.sender}:
                                </div>
                                <div className="text-primary mt-1 break-words">
                                    {msg.message}
                                </div>
                                <div className="text-primary mt-1 break-words text-xs font-semibold text-right">
                                    {msg.sentAt}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                    <div ref={messagesEndRef} />
                </motion.div>
                <div className="relative mt-4 border-t border-secondary pt-3">
                    <form onSubmit={sendMessage}>
                        <Textarea
                            placeholder="Напишіть повідомлення..."
                            className="w-full p-3 text-primary rounded-lg outline-none min-h-[150px]"
                            value={messageInput}
                            onChange={(e) => setMessageInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                        />
                        <Button
                            color="purpleBackground"
                            className="absolute right-4 bottom-4 rounded-full w-12 h-12 p-2"
                            disabled={isSending}
                            type="submit"
                        >
                            {isSending ? (
                                <AiOutlineLoading3Quarters className="text-white animate-spin size-6" />
                            ) : (
                                <IoSend className="text-white size-6" />
                            )}
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
};
