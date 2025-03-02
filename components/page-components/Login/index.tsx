"use client";

import { login } from "@/apis/auth";
import { Button } from "@/components/ui/Button";
import { LabelInput } from "@/components/ui/LabelInput";
import { setCookie } from "@/helpers/setCookie";
import { Link } from "@/helpers/navigation";
import { FormEvent, useState } from "react";
import { toast } from "react-toastify";
import { ImSpinner2 } from "react-icons/im";
import { validateEmail } from "@/helpers/validateEmail";
import { cn } from "@/helpers/cn";
import { SOMETHING_WRONG_MESSAGE } from "@/constants";
import { GoogleAuthButton } from "@/components/common/GoogleAuthButton";
import { useRouter } from "@/helpers/navigation";
import { useTranslations } from "next-intl";

export const LoginPageComponent = () => {
    const router = useRouter();
    const t = useTranslations("Auth");
    const t_toasts = useTranslations("Toasts");
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (!formData.email.trim() || !formData.password.trim()) {
            toast.error(t_toasts("fill-all-fields"));
            return;
        }

        if (!validateEmail(formData.email)) {
            toast.error(t_toasts("invalid-email"));
            return;
        }

        setIsLoading(true);
        try {
            const res = await login({
                email: formData.email,
                password: formData.password,
            });

            console.log(res);

            if (res.token) {
                setCookie("token", res.token);
                toast.success(t_toasts("auth-success"));
                router.refresh();

                const timeout = setTimeout(() => {
                    router.push("/profile");
                    clearTimeout(timeout);
                }, 1000);
            } else {
                toast.error(SOMETHING_WRONG_MESSAGE);
            }
        } catch (error) {
            console.error(error);
            toast.error(SOMETHING_WRONG_MESSAGE);
        }
        setIsLoading(false);
    };

    return (
        <div className="container sm:mt-12 mt-6 flex flex-col place-items-center">
            <h1>{t("login")}</h1>
            <form onSubmit={onSubmit} className="flex flex-col w-full">
                <div className="space-y-4 sm:mt-10 mt-6">
                    <LabelInput
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                        }
                        placeholder={t("email-placeholder")}
                        labelTitle={t("email-title")}
                        id="email"
                    />
                    <LabelInput
                        type="password"
                        id="password"
                        labelTitle={t("password-title")}
                        value={formData.password}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                password: e.target.value,
                            })
                        }
                        placeholder={t("password-placeholder")}
                    />
                </div>
                <Link
                    href="/register"
                    className="mt-2 text-purple text-start text-sm"
                >
                    {t("no-account")}
                </Link>
                <Button
                    color="purpleBackground"
                    type="submit"
                    className={cn(
                        "px-10 sm:px-20 text-lg mt-5 mx-auto sm:mt-16",
                        isLoading && "opacity-70",
                    )}
                >
                    {isLoading && (
                        <ImSpinner2 className="size-6 animate-spin text-primary" />
                    )}{" "}
                    <span>{t("login")}</span>
                </Button>
            </form>
            <GoogleAuthButton />
        </div>
    );
};
