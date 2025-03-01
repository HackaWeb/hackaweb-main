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

export const RegisterPageComponent = () => {
    const router = useRouter();

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
            toast.error("Заповніть усі поля");
            return;
        }

        if (!validateEmail(formData.email)) {
            toast.error("Ваша пошта не є поштою");
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            toast.error("Паролі не співпадають");
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
                setCookie("refreshToken", res.refreshToken);
                toast.success("Вас успішно зареєстровано!");
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
            <h1>Реєстрація</h1>
            <form
                onSubmit={onSubmit}
                className="flex flex-col place-items-center"
            >
                <div className="space-y-4 sm:mt-10 mt-6">
                    <LabelInput
                        labelTitle="Введіть пошту"
                        id="email"
                        placeholder="Пошта..."
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                        }
                    />
                    <LabelInput
                        labelTitle="Придумайте надійний пароль..."
                        placeholder="Надійний пароль"
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
                        labelTitle="Підтвердіть пароль..."
                        placeholder="Підтвердіть пароль"
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
                    <span>Реєстрація</span>
                </Button>
            </form>
            <GoogleAuthButton />
        </div>
    );
};
