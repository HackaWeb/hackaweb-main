"use client";

import { login } from "@/apis/auth";
import { Button } from "@/components/ui/Button";
import { LabelInput } from "@/components/ui/LabelInput";
import { setCookie } from "@/helpers/setCookie";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { toast } from "react-toastify";
import { ImSpinner2 } from "react-icons/im";
import { validateEmail } from "@/helpers/validateEmail";
import { cn } from "@/helpers/cn";
import { SOMETHING_WRONG_MESSAGE } from "@/constants";
import { GoogleAuthButton } from "@/components/common/GoogleAuthButton";
import { useRouter } from "@/helpers/navigation";

export const LoginPageComponent = () => {
    const router = useRouter();

    const [formData, setFormData] = useState({ email: "", password: "" });
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (!formData.email.trim() || !formData.password.trim()) {
            toast.error("Заповніть усі поля");
            return;
        }

        if (!validateEmail(formData.email)) {
            toast.error("Ваша пошта не є поштою");
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
                setCookie("refreshToken", res.refreshToken);
                toast.success("Вас успішно авторизовано!");
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
            <h1>Авторизація</h1>
            <form onSubmit={onSubmit} className="flex flex-col w-full">
                <div className="space-y-4 sm:mt-10 mt-6">
                    <LabelInput
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                        }
                        placeholder="Пошта..."
                        labelTitle="Введіть пошту"
                        id="email"
                    />
                    <LabelInput
                        type="password"
                        id="password"
                        labelTitle="Введіть пароль"
                        value={formData.password}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                password: e.target.value,
                            })
                        }
                        placeholder="Пароль..."
                    />
                </div>
                <Link
                    href="/register"
                    className="mt-2 text-purple text-start text-sm"
                >
                    Не маєте акаунту? Зареєструйтесь!
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
                    <span>Увійти</span>
                </Button>
            </form>
            <GoogleAuthButton />
        </div>
    );
};
