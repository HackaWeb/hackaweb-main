"use client";

import { Button } from "@/components/ui/Button";
import { LabelInput } from "@/components/ui/LabelInput";
import { FormEvent, useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "@/helpers/navigation";
import { ProfileFormProps } from "./ProfileForm.props";
import { updateProfile } from "@/apis/profile";
import { SOMETHING_WRONG_MESSAGE } from "@/constants";
import { useTranslations } from "next-intl";
import SaveBtn from "@/components/ui/SaveBtn";

export const ProfileForm = ({
    profile,
    isEditable,
    isSelfProfile,
}: ProfileFormProps) => {
    const router = useRouter();
    const t = useTranslations("Profile");

    const [userData, setUserData] = useState({
        firstName: profile.firstName || "",
        lastName: profile.lastName || "",
    });

    const onUpdateProfileSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (!userData.firstName.length && !userData.lastName.length) {
            toast.error("Заповніть хоча б одне поле");
        }

        try {
            const response = await updateProfile({
                firstName: userData.firstName,
                lastName: userData.lastName,
            });

            if (response.id) {
                toast.success(t("update-success"));
                router.refresh();
            }
        } catch (error) {
            toast.error(SOMETHING_WRONG_MESSAGE);
            console.error(error);
        }
    };

    return (
        <div className="p-4 bg-secondary rounded-md">
            <form onSubmit={onUpdateProfileSubmit}>
                <LabelInput
                    id="email"
                    labelTitle={t(isSelfProfile ? "your-email" : "user-email")}
                    value={profile.email}
                    type="email"
                    disabled
                    placeholder=""
                    onChange={() => {}}
                />
                <LabelInput
                    id="firstName"
                    labelTitle={t(isSelfProfile ? "your-name" : "user-name")}
                    value={userData.firstName}
                    type="text"
                    placeholder={isEditable ? "Введіть ім'я..." : ""}
                    disabled={!isEditable}
                    onChange={(e) =>
                        setUserData({
                            ...userData,
                            firstName: e.target.value,
                        })
                    }
                    className="mt-6"
                />
                <LabelInput
                    id="lastName"
                    labelTitle={t(
                        isSelfProfile ? "your-surname" : "user-surname",
                    )}
                    value={userData.lastName}
                    type="text"
                    placeholder={isEditable ? "Введіть прізвище..." : ""}
                    disabled={!isEditable}
                    onChange={(e) =>
                        setUserData({
                            ...userData,
                            lastName: e.target.value,
                        })
                    }
                    className="mt-6"
                />
                {isEditable && (
                    <SaveBtn type="submit" className="mt-6 mx-auto mb-2" />
                )}
            </form>
        </div>
    );
};
