"use client";

import { ReturnBtn } from "@/components/ui/ReturnBtn";
import { MyProfileProps } from "./MyProfile.props";
import { motion } from "framer-motion";
import { slideFromBottomAnimation } from "@/constants";
import { LeftColumnProfile } from "@/components/common/LeftColumnProfile";
import { ProfileForm } from "@/components/common/ProfileForm";
import { Table } from "@/components/ui/Table";
import MyKeys from "@/components/common/MyKeys";
import { useTranslations } from "next-intl";
import PromptHistory from "@/components/common/PromptHistory";

export const MyProfilePageComponent = ({ profile }: MyProfileProps) => {
    const t = useTranslations("Profile");

    const promptHistory = [
        [1, "Створи таску в Трелло", "2024-02-15"],
        [3, "Створи опис для нового курсу по програмуванню", "2024-02-12"],
        [2, "Привіт gpt", "2024-02-14"],
        [4, "Що таке AI?", "2024-02-13"],
    ];

    return (
        <motion.div
            {...slideFromBottomAnimation}
            className="mt-8 bg-secondary-light p-6 rounded-md"
        >
            <h1 className="text-primary">{t("my-profile")}</h1>
            <ReturnBtn className="mt-4" />
            <div className="mt-8 grid grid-cols-[1fr] sm:grid-cols-[240px_auto] 2xl:grid-cols-[240px_auto] gap-6 items-start">
                <LeftColumnProfile profile={profile} isEditable={true} />
                <div className="overflow-hidden flex flex-col gap-6">
                    <ProfileForm
                        profile={profile}
                        isEditable={true}
                        isSelfProfile={true}
                    />
                    <MyKeys />
                    <PromptHistory history={promptHistory} />
                </div>
            </div>
        </motion.div>
    );
};
