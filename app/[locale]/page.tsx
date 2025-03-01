import { getProfile } from "@/apis/profile";
import { ChatPageComponent } from "@/components/page-components/Chat";
import { getCookie } from "@/helpers/getCookie";
import { redirect } from "@/helpers/navigation";
import { UserProfile } from "@/types/user.interface";
import { Chat as IChat } from "@/components/page-components/Chat/Chat.props";

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

    return <ChatPageComponent profile={profile} />;
};

export default Chat;
