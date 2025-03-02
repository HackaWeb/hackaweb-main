import { getUsers } from "@/apis/users";
import { UsersPageComponent } from "@/components/crm/Users";

const Users = async () => {
    const getUsersHandler = async () => {
        try {
            const users = await getUsers();
            return users;
        } catch (error) {
            console.error("Failed to retrieve users");
            return [];
        }
    };

    const users = await getUsersHandler();

    return <UsersPageComponent users={users} />;
};

export default Users;
