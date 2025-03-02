import { UserProfile } from "@/types/user.interface";

export interface Message {
    sender: string;
    message: string;
    sentAt: string;
}

export interface Chat {
    id: string;
    user: UserProfile;
    messages: Message[];
}

export interface ChatProps {
    profile: UserProfile;
}
