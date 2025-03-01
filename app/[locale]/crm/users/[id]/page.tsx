import { getUser } from "@/apis/users";
import { UserDetailsPageComponent } from "@/components/crm/Users/UserDetails";
import { notFound } from "next/navigation";

const UserDetails = async ({ params }: { params: Promise<{ id: string }> }) => {
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

    return <UserDetailsPageComponent profile={user} />;
};

export default UserDetails;
