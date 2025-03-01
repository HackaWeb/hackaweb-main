import { useEffect, useState } from "react";
import * as signalR from "@microsoft/signalr";
import { Message } from "@/components/page-components/Chat/Chat.props";
import { UserProfile } from "@/types/user.interface";

export const useMessages = (profile: UserProfile) => {
    const [connection, setConnection] = useState<signalR.HubConnection | null>(
        null,
    );
    const [messages, setMessages] = useState<Message[]>([]);
    const [loading, setLoading] = useState(true);
    const [isSending, setIsSending] = useState(false);
    const [messageInput, setMessageInput] = useState("");

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
                                    message: serverResponse,
                                    sentAt: new Date().toLocaleTimeString(
                                        "uk-UA",
                                        {
                                            hour: "2-digit",
                                            minute: "2-digit",
                                        },
                                    ),
                                },
                            ]);
                        },
                    );

                    connection.on("ReceiveSystemMessage", (sysMsg: string) => {
                        setMessages((prev) => [
                            {
                                sender: "System",
                                message: sysMsg,
                                sentAt: new Date().toLocaleTimeString("uk-UA", {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                }),
                            },
                            ...prev,
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
                const history = await connection.invoke(
                    "LoadChatHistory",
                    profile.id,
                );
                console.log("Історія чату: ", history);
                setMessages((prev) => [
                    ...history.map((msg: Message) => ({
                        sender: msg.sender,
                        message: msg.message,
                        sentAt: new Date(msg.sentAt).toLocaleTimeString(
                            "uk-UA",
                            {
                                hour: "2-digit",
                                minute: "2-digit",
                            },
                        ),
                    })),
                    ...prev,
                ]);
                setLoading(false);
            } catch (error) {
                console.error("Помилка при завантаженні історії чату: ", error);
                setLoading(false);
            }
        }
    };

    const sendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (connection && messageInput.trim()) {
            setIsSending(true);
            setMessageInput("");
            try {
                setMessages((prev) => [
                    ...prev,
                    {
                        sender: profile.firstName || "User",
                        message: messageInput,
                        sentAt: new Date().toLocaleTimeString("uk-UA", {
                            hour: "2-digit",
                            minute: "2-digit",
                        }),
                    },
                ]);
                await connection.invoke(
                    "SendMessage",
                    profile.id,
                    messageInput,
                );
            } catch (error) {
                console.error("Помилка при надсиланні повідомлення: ", error);
            } finally {
                setIsSending(false);
            }
        }
    };

    return {
        messages,
        loading,
        setLoading,
        isSending,
        sendMessage,
        messageInput,
        setMessageInput,
    };
};
