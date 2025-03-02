import { getUsers } from "@/apis/users";
import CRMMenu from "@/components/common/CRMMenu";
import { UsersPageComponent } from "@/components/crm/Users";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

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

    return (
        <>
            <CRMMenu />
            <UsersPageComponent users={users} />
        </>
    );
};

export default Users;
