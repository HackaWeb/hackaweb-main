"use client";

import { useAppDispatch } from "@/store/hooks/useAppDispatch";
import { setIsAsideOpened } from "@/store/slices/aside";
import Image from "next/image";
import { AiOutlineUser } from "react-icons/ai";
import { HeaderProps } from "./Header.props";
import { RiLogoutBoxLine } from "react-icons/ri";
import { printUserNickname } from "@/helpers/printUserNickname";
import { setCookie } from "@/helpers/setCookie";
import { toast } from "react-toastify";
import { Language } from "./Language";
import { Messages } from "./Messages";
import { ThemeSwitch } from "./ThemeSwitch";
import { Link, useRouter } from "@/helpers/navigation";
import { useTranslations } from "next-intl";

export const Header = ({ profile, theme, defaultLocale }: HeaderProps) => {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const t = useTranslations("Header");

    const setIsAsideOpenedHandler = (value: boolean) => {
        dispatch(setIsAsideOpened(value));
    };

    const onLogoutClick = () => {
        setCookie("token", "");
        toast.success("Ви успішно вийшли з акаунту!");
        router.refresh();
    };

    return (
        <header className="max-sm:py-4 px-4 sm:p-6 sm:px-20 lg:px-6 bg-secondary-light rounded-md flex flex-col sm:flex-row gap-4 sm:gap-0 justify-between items-center">
            <div className="flex items-center gap-4">
                <Language defaultLocale={defaultLocale} />
                <ThemeSwitch theme={theme} />
            </div>
            <div className="flex items-center gap-4">
                {!profile ? (
                    <div className="flex items-center gap-4 bg-secondary p-2">
                        <div className="p-1 w-12 h-12 border-purple border-2 rounded-md xsm:p-3 flex justify-center items-center">
                            <AiOutlineUser className="text-purple size-6" />
                        </div>
                        <div className="flex items-center gap-2">
                            <Link
                                className="text-yellow-light hover:text-yellow-dark"
                                href="/login"
                                onClick={() => setIsAsideOpenedHandler(false)}
                            >
                                Увійти
                            </Link>
                            <div className="w-[1px] h-8 bg-gray-dark"></div>
                            <Link
                                href="/register"
                                onClick={() => setIsAsideOpenedHandler(false)}
                            >
                                Реєстрація
                            </Link>
                        </div>
                    </div>
                ) : (
                    <div className="flex items-center gap-4">
                        <div className="flex bg-secondary p-2 relative w-auto rounded-md">
                            <div className="p-2 w-12 h-12 border-purple border-2 rounded-md flex justify-center items-center">
                                {!profile.avatarUrl ? (
                                    <AiOutlineUser className="text-purple size-6" />
                                ) : (
                                    <Image
                                        src={profile.avatarUrl}
                                        alt={
                                            (profile.firstName || "") +
                                            " " +
                                            (profile.lastName || "")
                                        }
                                        width={0}
                                        height={0}
                                        sizes="100vw"
                                        className="w-full h-full object-cover"
                                    />
                                )}
                            </div>
                            <div className="mx-4">
                                <Link
                                    href="/profile"
                                    className="text-primary font-semibold"
                                >
                                    {printUserNickname(
                                        profile.firstName,
                                        profile.lastName,
                                    )}
                                </Link>
                                <button
                                    onClick={onLogoutClick}
                                    className=" flex items-center gap-1 text-sm mt-1 text-red-light transition-colors hover:text-red-dark"
                                >
                                    <RiLogoutBoxLine />
                                    <span>{t("log-out")}</span>
                                </button>
                            </div>
                        </div>
                        <Messages />
                    </div>
                )}
            </div>
        </header>
    );
};
