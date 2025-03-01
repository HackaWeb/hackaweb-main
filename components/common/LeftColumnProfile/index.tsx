"use client";

import { ChangeEvent, useState } from "react";
import { AiOutlineUser, AiOutlineClose } from "react-icons/ai";
import { Button } from "@/components/ui/Button";
import { deleteProfileImage, updateProfileImage } from "@/apis/profile";
import { toast } from "react-toastify";
import { useRouter } from "@/helpers/navigation";
import Image from "next/image";
import { LeftColumnProfileProps } from "./LeftColumnProfile.props";
import { motion } from "framer-motion";
import { popAnimation, SOMETHING_WRONG_MESSAGE } from "@/constants";
import { printUserNickname } from "@/helpers/printUserNickname";
import { useTranslations } from "next-intl";

export const LeftColumnProfile = ({
    profile,
    isEditable,
}: LeftColumnProfileProps) => {
    const router = useRouter();
    const t = useTranslations("Profile");

    const [avatar, setAvatar] = useState<string | null>(
        profile.avatarUrl ?? null,
    );

    const updateAvatarHandler = async (imageData: File) => {
        const formData = new FormData();
        formData.append("file", imageData);

        try {
            const res = await updateProfileImage(formData);

            if (res.avatarUrl) {
                toast.success("Аватар успішно змінено!");
                router.refresh();
            } else {
                toast.error(SOMETHING_WRONG_MESSAGE);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const deleteAvatarHandler = async () => {
        try {
            const res = await deleteProfileImage();

            if (res.isSuccess) {
                toast.success("Аватар видалено успішно!");
                setAvatar(null);
                router.refresh();
            } else {
                toast.error(SOMETHING_WRONG_MESSAGE);
            }
        } catch (error) {
            console.error(error);
            toast.error(SOMETHING_WRONG_MESSAGE);
        }
    };

    const onAvatarChange = async (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        setAvatar(URL.createObjectURL(file));
        await updateAvatarHandler(file);
    };

    return (
        <div className="max-w-[500px]">
            <div className="p-4 bg-secondary rounded-md ">
                <div className="w-full h-auto aspect-square border border-purple rounded-md p-2 relative">
                    {isEditable && avatar && (
                        <Button
                            className="absolute top-1 right-1 p-1 z-10"
                            onClick={deleteAvatarHandler}
                            color="redBorder"
                            name="Видалити аватар"
                            aria-label="Видалити аватар"
                        >
                            <AiOutlineClose className="size-5" />
                        </Button>
                    )}
                    <motion.div
                        key={avatar}
                        {...popAnimation}
                        className="w-full h-full flex items-center justify-center rounded-md overflow-hidden"
                    >
                        {avatar ? (
                            <>
                                <Image
                                    src={avatar}
                                    alt="Avatar"
                                    className="w-full h-full object-cover"
                                    width={0}
                                    height={0}
                                    sizes="100vw"
                                />
                            </>
                        ) : (
                            <AiOutlineUser className="text-purple size-20" />
                        )}
                    </motion.div>
                </div>
                {isEditable && (
                    <label className="underline text-purple mt-2 text-center block cursor-pointer">
                        {t("change-avatar")}
                        <input
                            type="file"
                            accept=".png,.jpeg"
                            className="hidden"
                            onChange={onAvatarChange}
                        />
                    </label>
                )}
                <div className="mt-4 text-center text-xl font-semibold text-primary">
                    {printUserNickname(profile.firstName, profile.lastName)}
                </div>
            </div>
        </div>
    );
};
