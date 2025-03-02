import { getProfile } from "@/apis/profile";
import { getMyTransactions } from "@/apis/transactions";
import { MyProfilePageComponent } from "@/components/page-components/MyProfile";
import { getCookie } from "@/helpers/getCookie";
import { redirect } from "@/helpers/navigation";
import { UserProfile } from "@/types/user.interface";

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

    const profile = await getProfileHandler();
    if (!profile) {
        redirect("/login");
    }

    const transactions = await getMyTransactions();

    return (
        <MyProfilePageComponent
            profile={profile as UserProfile}
            transactions={transactions}
        />
    );
};

export default MyProfile;
