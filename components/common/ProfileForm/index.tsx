"use client";

import { Button } from "@/components/ui/Button";
import { LabelInput } from "@/components/ui/LabelInput";
import { FormEvent, useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "@/helpers/navigation";
import { ProfileFormProps } from "./ProfileForm.props";
import { updateProfile } from "@/apis/profile";
import { SOMETHING_WRONG_MESSAGE } from "@/constants";

export const ProfileForm = ({
    profile,
    isEditable,
    isSelfProfile,
}: ProfileFormProps) => {
    const router = useRouter();

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
                toast.success("Профіль успішно оновлено");
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
                    labelTitle={
                        isSelfProfile ? "Ваша пошта" : `Пошта користувача`
                    }
                    value={profile.email}
                    type="email"
                    disabled
                    placeholder=""
                    onChange={() => {}}
                />
                <LabelInput
                    id="firstName"
                    labelTitle={
                        isSelfProfile ? "Ваше імʼя" : "Імʼя користувача"
                    }
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
                    labelTitle={
                        isSelfProfile ? "Ваше прізвище" : "Прізвище користувача"
                    }
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
                    <Button
                        type="submit"
                        color="purpleBackground"
                        className="mt-6 mx-auto mb-2"
                    >
                        Зберегти зміни
                    </Button>
                )}
            </form>
        </div>
    );
};
