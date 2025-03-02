"use client";

import { register } from "@/apis/auth";
import { GoogleAuthButton } from "@/components/common/GoogleAuthButton";
import { Button } from "@/components/ui/Button";
import { LabelInput } from "@/components/ui/LabelInput";
import { SOMETHING_WRONG_MESSAGE } from "@/constants";
import { cn } from "@/helpers/cn";
import { setCookie } from "@/helpers/setCookie";
import { validateEmail } from "@/helpers/validateEmail";
import { useRouter } from "@/helpers/navigation";
import { FormEvent, useState } from "react";
import { ImSpinner2 } from "react-icons/im";
import { toast } from "react-toastify";
import { useTranslations } from "next-intl";

export const RegisterPageComponent = () => {
    const router = useRouter();
    const t = useTranslations("Auth");
    const t_toasts = useTranslations("Toasts");
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (
            !formData.email.trim() ||
            !formData.password.trim() ||
            !formData.confirmPassword.trim()
        ) {
            toast.error(t_toasts("fill-all-fields"));
            return;
        }

        if (!validateEmail(formData.email)) {
            toast.error(t_toasts("invalid-email"));
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            toast.error(t_toasts("passwords-not-match"));
            return;
        }

        setIsLoading(true);
        try {
            const res = await register({
                email: formData.email,
                password: formData.password,
            });

            if (res.token) {
                setCookie("token", res.token);
                toast.success(t_toasts("auth-success"));
                router.refresh();

                const timeout = setTimeout(() => {
                    router.push("/profile");
                    clearTimeout(timeout);
                }, 1000);
            } else {
                setIsLoading(false);
                toast.error(SOMETHING_WRONG_MESSAGE);
            }
        } catch (error) {
            setIsLoading(false);
            console.error(error);
            toast.error(SOMETHING_WRONG_MESSAGE);
        }
    };

    return (
        <div className="container sm:mt-12 mt-6 flex flex-col place-items-center">
            <h1>{t("register")}</h1>
            <form
                onSubmit={onSubmit}
                className="flex flex-col place-items-center"
            >
                <div className="space-y-4 sm:mt-10 mt-6">
                    <LabelInput
                        labelTitle={t("email-title")}
                        id="email"
                        placeholder={t("email-placeholder")}
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                        }
                    />
                    <LabelInput
                        labelTitle={t("strong-password-title")}
                        placeholder={t("strong-password-placeholder")}
                        id="password"
                        type="password"
                        value={formData.password}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                password: e.target.value,
                            })
                        }
                    />
                    <LabelInput
                        labelTitle={t("password-confirm-title")}
                        placeholder={t("password-confirm-placeholder")}
                        id="new-password"
                        type="password"
                        value={formData.confirmPassword}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                confirmPassword: e.target.value,
                            })
                        }
                    />
                </div>
                <Button
                    color="purpleBackground"
                    type="submit"
                    className={cn(
                        "px-10 sm:px-20 text-lg mt-5 sm:mt-16",
                        isLoading && "opacity-70",
                    )}
                    disabled={isLoading}
                >
                    {isLoading && (
                        <ImSpinner2 className="size-6 animate-spin text-primary" />
                    )}{" "}
                    <span>{t("register")}</span>
                </Button>
            </form>
            <GoogleAuthButton />
        </div>
    );
};
