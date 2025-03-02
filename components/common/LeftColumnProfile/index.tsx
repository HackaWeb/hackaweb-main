"use client";

import { AiOutlineUser } from "react-icons/ai";
import { LeftColumnProfileProps } from "./LeftColumnProfile.props";
import { printUserNickname } from "@/helpers/printUserNickname";

export const LeftColumnProfile = ({ profile }: LeftColumnProfileProps) => {
    return (
        <div className="max-w-[500px]">
            <div className="p-4 bg-secondary rounded-md flex flex-col justify-center items-center">
                <div className="w-32 sm:w-full h-auto aspect-square border border-purple rounded-md p-2 flex justify-center items-center">
                    <AiOutlineUser className="text-purple size-24 sm:size-32" />
                </div>
                <div className="mt-4 text-center text-xl font-semibold text-primary">
                    {printUserNickname(profile.firstName, profile.lastName)}
                </div>
            </div>
        </div>
    );
};
