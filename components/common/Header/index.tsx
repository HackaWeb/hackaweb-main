"use client";

import { useAppDispatch } from "@/store/hooks/useAppDispatch";
import { setIsAsideOpened } from "@/store/slices/aside";
import { AiOutlineUser } from "react-icons/ai";
import { HeaderProps } from "./Header.props";
import { RiCopperCoinLine, RiLogoutBoxLine } from "react-icons/ri";
import { printUserNickname } from "@/helpers/printUserNickname";
import { setCookie } from "@/helpers/setCookie";
import { toast } from "react-toastify";
import { Language } from "./Language";
import { ThemeSwitch } from "./ThemeSwitch";
import { Link, useRouter } from "@/helpers/navigation";
import { useTranslations } from "next-intl";
import { FaRegPlusSquare } from "react-icons/fa";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/types/modal.enum";
import { setOpenedModal } from "@/store/slices/openedModal";

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
        <header className="max-sm:py-4 px-4 sm:p-6  lg:px-6 bg-secondary-light rounded-md flex flex-col sm:flex-row gap-4 sm:gap-0 justify-between items-center">
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
                        <Button
                            color="purpleBackground"
                            onClick={() =>
                                dispatch(setOpenedModal(Modal.Deposit))
                            }
                        >
                            <span>Поповнити баланс</span>
                            <FaRegPlusSquare />
                        </Button>

                        <div className="flex bg-secondary p-2 relative w-auto rounded-md">
                            <div className="p-2 w-12 h-12 border-purple border-2 rounded-md flex justify-center items-center">
                                <AiOutlineUser className="text-purple size-6" />
                            </div>
                            <div className="mx-4 flex flex-col">
                                <Link
                                    href="/profile"
                                    className="text-primary font-semibold"
                                >
                                    {printUserNickname(
                                        profile.firstName,
                                        profile.lastName,
                                    )}
                                </Link>

                                <div className="flex items-center gap-2 text-primary font-semibold">
                                    <div className="text-gray-dark">
                                        Баланс:
                                    </div>
                                    <div className="flex items-center gap-1">
                                        {5}
                                        <RiCopperCoinLine className="text-yellow-light" />
                                    </div>
                                </div>

                                <button
                                    onClick={onLogoutClick}
                                    className="flex items-center gap-1 text-sm mt-1 text-red-light transition-colors hover:text-red-dark self-end"
                                >
                                    <RiLogoutBoxLine />
                                    <span>{t("log-out")}</span>
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
};
