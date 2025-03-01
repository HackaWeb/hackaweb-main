"use client";

import { Button } from "@/components/ui/Button";
import { Table } from "@/components/ui/Table";
import { Link, useRouter } from "@/helpers/navigation";
import { FaEdit, FaTrashAlt, FaCoins } from "react-icons/fa";
import { UsersProps } from "./Users.props";
import { deleteUser } from "@/apis/users";
import { toast } from "react-toastify";
import { formatDateTime } from "@/helpers/formatDate";
import { useTranslations } from "next-intl";

export const UsersPageComponent = ({ users }: UsersProps) => {
    const router = useRouter();
    const t = useTranslations("CRM");

    const headers = [
        t("id"),
        t("first-name"),
        t("last-name"),
        t("email"),
        t("registration-date"),
        t("balance"),
        t("actions"),
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
                    {t("edit")}
                </Button>
            </Link>
            <Button
                className="text-sm py-2 px-4"
                color="redBorder"
                onClick={() => deleteUserHandler(user.id)}
            >
                <FaTrashAlt />
                {t("delete")}
            </Button>
        </div>,
    ]);

    return (
        <div className="grid bg-secondary-light p-6 rounded-md">
            <h1 className="text-2xl font-bold mb-4 text-primary">
                {t("users-list")}
            </h1>
            <Table headers={headers} data={data} className="mt-4" />
        </div>
    );
};
