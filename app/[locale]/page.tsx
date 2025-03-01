import { getProfile } from "@/apis/profile";
import { ChatPageComponent } from "@/components/page-components/Chat";
import { getCookie } from "@/helpers/getCookie";
import { redirect } from "@/helpers/navigation";
import { UserProfile } from "@/types/user.interface";
import { Chat as IChat } from "@/components/page-components/Chat/Chat.props";

const chats: IChat[] = [
    {
        id: "1",
        user: {
            id: "101",
            firstName: "Анна",
            lastName: "Іванова",
            avatarUrl: "",
            email: "",
            createdAt: "",
        },
        messages: [
            {
                sender: {
                    id: "101",
                    firstName: "Анна",
                    lastName: "Іванова",
                    avatarUrl: "",
                    email: "",
                    createdAt: "",
                },
                text: "Привіт! Як справи?",
                createdAt: "26 Лют 2025, 12:26",
            },
            {
                sender: {
                    id: "9c965e05-a751-4e78-e58b-08dd540534af",
                    firstName: "Danil",
                    lastName: "Diachenko",
                    avatarUrl: "",
                    email: "",
                    createdAt: "",
                },
                text: "Привіт! Все добре!",
                createdAt: "26 Лют 2025, 12:28",
            },
        ],
    },
    {
        id: "2",
        user: {
            id: "32432",
            firstName: "Тест",
            lastName: "Юзер",
            avatarUrl: "",
            email: "",
            createdAt: "",
        },
        messages: [
            {
                sender: {
                    id: "101",
                    firstName: "Анна",
                    lastName: "Іванова",
                    avatarUrl: "",
                    email: "",
                    createdAt: "",
                },
                text: "Привіт! Як справи?",
                createdAt: "26 Лют 2025, 12:26",
            },
            {
                sender: {
                    id: "9c965e05-a751-4e78-e58b-08dd540534af",
                    firstName: "Danil",
                    lastName: "Diachenko",
                    avatarUrl: "",
                    email: "",
                    createdAt: "",
                },
                text: "Привіт! Все добре!",
                createdAt: "26 Лют 2025, 12:29",
            },
        ],
    },
    {
        id: "3",
        user: {
            id: "101",
            firstName: "Тестовий",
            lastName: "Юзерок",
            avatarUrl: "",
            email: "",
            createdAt: "",
        },
        messages: [
            {
                sender: {
                    id: "101",
                    firstName: "Анна",
                    lastName: "Іванова",
                    avatarUrl: "",
                    email: "",
                    createdAt: "",
                },
                text: "Привіт! Як справи?",
                createdAt: "26 Лют 2025, 12:26",
            },
            {
                sender: {
                    id: "9c965e05-a751-4e78-e58b-08dd540534af",
                    firstName: "Danil",
                    lastName: "Diachenko",
                    avatarUrl: "",
                    email: "",
                    createdAt: "",
                },
                text: "Привіт! Все добре!",
                createdAt: "26 Лют 2025, 12:28",
            },
        ],
    },
];

const Chat = async () => {
    const token = await getCookie("token");

    if (!token) {
        redirect("/login");
    }

    const getProfileHandler = async (): Promise<UserProfile> => {
        try {
            const response = await getProfile();

            if (response.id) {
                return response;
            } else {
                redirect("/login");
                throw new Error("No profile ID found");
            }
        } catch (error) {
            console.error(error);
            redirect("/login");
            throw error;
        }
    };

    const profile = await getProfileHandler();
    if (!profile) {
        redirect("/login");
    }

    return <ChatPageComponent chats={chats} profile={profile} />;
};

export default Chat;
