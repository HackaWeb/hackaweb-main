import { UserProfile } from "@/types/user.interface";

export interface Message {
    sender: UserProfile;
    text: string;
    createdAt: string;
}

export interface Chat {
    id: string;
    user: UserProfile;
    messages: Message[];
}

export interface ChatProps {
    chats: Chat[];
    profile: UserProfile;
}
