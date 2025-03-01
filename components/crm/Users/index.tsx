"use client";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Table } from "@/components/ui/Table";
import Image from "next/image";
import Link from "next/link";
import { AiOutlineUser } from "react-icons/ai";
import { FaEdit, FaTrashAlt, FaPlus } from "react-icons/fa";

export const UsersPageComponent = ({ users }: { users: any[] }) => {
    const headers = [
        "ID",
        "Avatar",
        "Name",
        "Email",
        "Phone",
        "City",
        "Role",
        "Status",
        "Registration Date",
        "Last Login",
        "Actions",
    ];

    const data = users.map((user) => [
        <Link href={`/crm/users/${user.id}`} key={user.id}>
            {user.id}
        </Link>,
        <div
            className="p-2 w-12 h-12 border-purple border-2 rounded-md flex justify-center items-center"
            key={user.id}
        >
            <AiOutlineUser className="text-purple size-6" />
        </div>,
        user.name,
        user.email,
        user.phone,
        user.city,
        user.role,
        <span
            className={
                user.status === "Active" ? "text-green-500" : "text-red-500"
            }
            key={user.id}
        >
            {user.status}
        </span>,
        user.registrationDate,
        user.lastLogin,
        <div className="flex gap-2" key={user.id}>
            <Button className="text-sm py-2 px-4" color="purpleBorder">
                <FaEdit />
                Edit
            </Button>
            <Button className="text-sm py-2 px-4" color="redBorder">
                <FaTrashAlt />
                Delete
            </Button>
        </div>,
    ]);

    return (
        <div className="p-6 grid">
            <h1 className="text-2xl font-bold mb-4 text-primary">Users List</h1>
            <div className="bg-secondary-light rounded-md p-4 w-full overflow-hidden">
                <div className="flex justify-between">
                    <Input
                        placeholder="Search data..."
                        className="max-w-[300px]"
                    />
                    <div className="flex items-center gap-4">
                        <div className="w-40">
                            <Select
                                options={[
                                    { value: "1", title: "ID" },
                                    { value: "2", title: "Name" },
                                    { value: "3", title: "Email" },
                                    { value: "4", title: "Role" },
                                ]}
                                placeholder="Sort by"
                                activeOption={null}
                                setActiveOption={() => {}}
                                id="sort-by"
                            />
                        </div>
                        <div className="w-60">
                            <Select
                                options={[
                                    { value: "1", title: "ID" },
                                    { value: "2", title: "Name" },
                                    { value: "3", title: "Email" },
                                    { value: "4", title: "Role" },
                                ]}
                                placeholder="Sort by Sort by"
                                activeOption={null}
                                setActiveOption={() => {}}
                                id="sort-by"
                            />
                        </div>
                        <Button className="" color="purpleBackground">
                            <FaPlus />
                            <span>New Data</span>
                        </Button>
                    </div>
                </div>
                <Table headers={headers} data={data} className="mt-4" />
            </div>
        </div>
    );
};
