"use client";

import { ReturnBtn } from "@/components/ui/ReturnBtn";
import { motion } from "framer-motion";
import { slideFromBottomAnimation } from "@/constants";
import { printUserNickname } from "@/helpers/printUserNickname";
import { UserProfileProps } from "./UserProfile.props";
import { LeftColumnProfile } from "@/components/common/LeftColumnProfile";
import { ProfileForm } from "@/components/common/ProfileForm";
import { useTranslations } from "next-intl";
import PromptHistory from "@/components/common/PromptHistory";
import { useMessages } from "@/hooks/useMessages";
import Transactions from "@/components/common/Transactions";

export const UserDetailsPageComponent = ({
    profile,
    isEditable,
    transactions,
}: UserProfileProps) => {
    const t = useTranslations("Profile");
    const { messages } = useMessages(profile);

    return (
        profile && (
            <motion.div
                {...slideFromBottomAnimation}
                className="mt-8 bg-secondary-light p-6 rounded-md"
            >
                <h1 className="text-primary">
                    {t("user-profile")}{" "}
                    {printUserNickname(profile.firstName, profile.lastName)}
                </h1>
                <ReturnBtn className="mt-4" />
                <div className="mt-8 grid grid-cols-[1fr] sm:grid-cols-[240px_auto] 2xl:grid-cols-[240px_auto] gap-6 items-start">
                    <div>
                        <LeftColumnProfile
                            profile={profile}
                            isEditable={isEditable}
                        />
                    </div>
                    <div className="overflow-hidden">
                        <ProfileForm
                            profile={profile}
                            isEditable={isEditable}
                            isSelfProfile={false}
                        />
                        <PromptHistory history={messages} />
                        {isEditable && (
                            <Transactions transactions={transactions} />
                        )}
                    </div>
                </div>
            </motion.div>
        )
    );
};
