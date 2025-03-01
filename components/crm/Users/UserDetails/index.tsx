"use client";

import { ReturnBtn } from "@/components/ui/ReturnBtn";
import { motion } from "framer-motion";
import { slideFromBottomAnimation } from "@/constants";
import { printUserNickname } from "@/helpers/printUserNickname";
import { UserProfileProps } from "./UserProfile.props";
import { LeftColumnProfile } from "@/components/common/LeftColumnProfile";
import { ProfileForm } from "@/components/common/ProfileForm";
import { Table } from "@/components/ui/Table";

const headers = ["ID", "Name", "Email", "Role"];

const data = [
    [1, "John Doe", "john.doe@example.com", "Admin"],
    [2, "Jane Smith", "jane.smith@example.com", "User"],
    [3, "Mark Johnson", "mark.johnson@example.com", "Moderator"],
    [4, "Emily Davis", "emily.davis@example.com", "User"],
];

export const UserDetailsPageComponent = ({ profile }: UserProfileProps) => {
    return (
        profile && (
            <motion.div
                {...slideFromBottomAnimation}
                className="mt-8 bg-secondary-light p-6 rounded-md"
            >
                <h1 className="text-primary">
                    Профіль користувача{" "}
                    {printUserNickname(profile.firstName, profile.lastName)}
                </h1>
                <ReturnBtn className="mt-4" />
                <div className="mt-8 grid grid-cols-[1fr] sm:grid-cols-[240px_auto] 2xl:grid-cols-[240px_auto] gap-6 items-start">
                    <div>
                        <LeftColumnProfile
                            profile={profile}
                            isEditable={true}
                        />
                    </div>
                    <div className="overflow-hidden">
                        <ProfileForm
                            profile={profile}
                            isEditable={true}
                            isSelfProfile={false}
                        />
                        <div>
                            <div className="bg-secondary-light p-4 rounded-md mt-6 overflow-hidden">
                                <div className="text-primary font-semibold text-lg">
                                    Table Title
                                </div>
                                <Table
                                    className="mt-4"
                                    headers={headers}
                                    data={data}
                                />
                            </div>
                            <div className="bg-secondary-light p-4 rounded-md mt-6 overflow-hidden">
                                <Table headers={headers} data={data} />
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        )
    );
};
