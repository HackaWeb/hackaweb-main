"use client";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Table } from "@/components/ui/Table";
import { UserProfile } from "@/types/user.interface";
import Image from "next/image";
import { formatDate } from "@/helpers/formatDate";
import { Link, useRouter } from "@/helpers/navigation";
import { AiOutlineUser } from "react-icons/ai";
import { FaEdit, FaTrashAlt, FaPlus, FaCoins } from "react-icons/fa";
import { useRedirect } from "@/hooks/useRedirect";
import { UsersProps } from "./Users.props";
import { deleteUser } from "@/apis/users";
import { toast } from "react-toastify";

export const UsersPageComponent = ({ users }: UsersProps) => {
    const router = useRouter();
    const headers = [
        "ID",
        // "Avatar",
        "First Name",
        "Last Name",
        "Email",
        // "Phone",
        // "City",
        // "Role",
        // "Status",
        "Registration Date",
        // "Last Login",
        "Balance",
        "Actions",
    ];

    const deleteUserHandler = async (userId: string) => {
        try {
            const res = await deleteUser(userId);
            if (!res.IsSuccess) {
                toast.error(res.ErrorMessage);
            } else {
                router.refresh();
            }
        } catch (error) {
            console.error(error);
        }
    };

    const data = users.map((user, index) => [
        <Link href={`/crm/users/${user.id}`} key={user.id}>
            {user.id}
        </Link>,
        user.firstName,
        user.lastName,
        user.email,
        // user.phone,
        // user.city,
        // user.role,
        formatDate(user.createdAt),
        <div className="flex gap-1 items-center">
            {index}
            <FaCoins className="w-4 h-4" />
        </div>,
        <div className="flex gap-2" key={user.id}>
            <Link href={`/crm/users/${user.id}`} key={user.id}>
                <Button className="text-sm py-2 px-4" color="purpleBorder">
                    <FaEdit />
                    Edit
                </Button>
            </Link>
            <Button
                className="text-sm py-2 px-4"
                color="redBorder"
                onClick={() => deleteUserHandler(user.id)}
            >
                <FaTrashAlt />
                Delete
            </Button>
        </div>,
    ]);

    return (
        <div className="p-6 grid">
            <h1 className="text-2xl font-bold mb-4 text-primary">Users List</h1>
            <Table headers={headers} data={data} className="mt-4" />
        </div>
    );
};
