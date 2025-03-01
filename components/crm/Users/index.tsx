"use client";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Table } from "@/components/ui/Table";
import { UserProfile } from "@/types/user.interface";
import Image from "next/image";
import { Link, useRouter } from "@/helpers/navigation";
import { AiOutlineUser } from "react-icons/ai";
import { FaEdit, FaTrashAlt, FaPlus, FaCoins } from "react-icons/fa";
import { useRedirect } from "@/hooks/useRedirect";
import { UsersProps } from "./Users.props";
import { deleteUser } from "@/apis/users";
import { toast } from "react-toastify";
import { formatDateTime } from "@/helpers/formatDate";

export const UsersPageComponent = ({ users }: UsersProps) => {
    const router = useRouter();
    const headers = [
        "ID",
        "First Name",
        "Last Name",
        "Email",
        "Registration Date",
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
        user.firstName ? user.firstName.slice(0, 20) + "..." : "",
        user.lastName ? user.lastName.slice(0, 20) + "..." : "",
        user.email,
        user.createdAt ? formatDateTime(new Date(user.createdAt)) : "",
        <div className="flex gap-1 items-center text-purple font-semibold">
            {index}
            <FaCoins className="size-4" />
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
        <div className="grid bg-secondary-light p-6 rounded-md">
            <h1 className="text-2xl font-bold mb-4 text-primary">Users List</h1>
            <Table headers={headers} data={data} className="mt-4" />
        </div>
    );
};
