import { getProfile } from "@/apis/profile";
import { getTransactionsByUserId } from "@/apis/transactions";
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

    const getIsUserAdmin = async () => {
        try {
            const response = await getProfile();
            return response.isAdmin ?? true;
        } catch (error) {
            console.error(error);
            return false;
        }
    };

    const user = await getUserHandler();
    if (!user) notFound();
    const isEditable = await getIsUserAdmin();
    const transactions = await getTransactionsByUserId(user.id);

    return (
        <UserDetailsPageComponent
            isEditable={isEditable}
            profile={user}
            transactions={transactions}
        />
    );
};

export default UserDetails;
