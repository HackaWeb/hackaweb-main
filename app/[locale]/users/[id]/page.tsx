import { getUser } from "@/apis/users";
import { UserProfilePageComponent } from "@/components/page-components/UserProfile";
import { notFound } from "next/navigation";

const UserProfile = async ({ params }: { params: Promise<{ id: string }> }) => {
    const userId = (await params).id;

    const getUserHandler = async () => {
        try {
            const response = await getUser(userId);
            if (response.id) {
                return { ...response };
            }

            return null;
        } catch (error) {
            console.error(error);
            return null;
        }
    };

    const user = await getUserHandler();
    if (!user) notFound();

    return <UserProfilePageComponent profile={user} />;
};

export default UserProfile;
