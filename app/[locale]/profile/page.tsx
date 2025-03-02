import { getCredentials } from "@/apis/credentials";
import { getProfile } from "@/apis/profile";
import { getMyTransactions } from "@/apis/transactions";
import { MyProfilePageComponent } from "@/components/page-components/MyProfile";
import { getCookie } from "@/helpers/getCookie";
import { redirect } from "@/helpers/navigation";
import { UserProfile } from "@/types/user.interface";
import { toast } from "react-toastify";

const MyProfile = async () => {
    const token = await getCookie("token");

    if (!token) {
        redirect("/login");
    }

    const getProfileHandler = async () => {
        try {
            const response = await getProfile();

            if (response.id) {
                return response;
            } else {
                redirect("/login");
            }
        } catch (error) {
            console.error(error);
            redirect("/login");
        }
    };

    const fetchKeys = async () => {
        try {
            const userProfile = await getCredentials();
            return userProfile.keys;
        } catch (error) {
            console.error("Failed to load profile:", error);
            return null;
        }
    };

    const profile = await getProfileHandler();
    if (!profile) {
        redirect("/login");
    }

    const keys = await fetchKeys();

    const transactions = await getMyTransactions();

    return (
        <MyProfilePageComponent
            profile={profile as UserProfile}
            transactions={transactions}
            keys={keys ?? []}
        />
    );
};

export default MyProfile;
