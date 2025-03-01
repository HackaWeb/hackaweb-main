"use client";

import { AiOutlineUser } from "react-icons/ai";
import { useEffect, useState } from "react";
import { useAppSelector } from "@/store/hooks/useAppSelector";
import { selectAside, setIsAsideOpened } from "@/store/slices/aside";
import { useAppDispatch } from "@/store/hooks/useAppDispatch";
import { Button } from "@/components/ui/Button";
import { RxHamburgerMenu } from "react-icons/rx";
import { AsideProps } from "./Aside.props";
import { usePathname } from "@/helpers/navigation";
import { Link } from "@/helpers/navigation";
import { IoLogoSnapchat } from "react-icons/io";
import { IoChatbubbleEllipses } from "react-icons/io5";
import { useTranslations } from "next-intl";

export const Aside = ({ profile }: AsideProps) => {
    const t = useTranslations("Aside");
    const links = [
        {
            title: t("chat"),
            link: "/",
            icon: <IoChatbubbleEllipses className="size-6" />,
        },
        {
            title: t("profile"),
            link: profile ? "/profile" : "/login",
            icon: <AiOutlineUser className="size-6" />,
        },
    ];

    const dispatch = useAppDispatch();
    const pathname = usePathname();

    const [activeLink, setActiveLink] = useState<string | null>(null);

    const aside = useAppSelector(selectAside);

    const setIsAsideOpenedHandler = (value: boolean) => {
        dispatch(setIsAsideOpened(value));
    };

    useEffect(() => {
        setIsAsideOpenedHandler(false);
    }, [pathname]);

    return (
        <>
            <Button
                color="purpleBorder"
                onClick={() => setIsAsideOpenedHandler(true)}
                className="absolute top-2 left-2 lg:hidden p-2"
            >
                <RxHamburgerMenu className="size-6" />
            </Button>
            {aside && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 transition-opacity duration-300"
                    onClick={() => setIsAsideOpenedHandler(false)}
                />
            )}
            <aside
                className={`min-h-[100vh] h-full top-0 left-0 bottom-0 w-[260px] fixed lg:relative lg:w-full z-50 lg:z-0 bg-blue-dark p-4 shadow-lg 
                transition-transform duration-300 ${
                    aside ? "translate-x-0" : "-translate-x-full"
                } lg:translate-x-0`}
            >
                <div className="xsm:mt-6 mt-4">
                    <Link
                        href="/"
                        className="text-primary text-2xl flex items-center gap-2 text-white"
                        onClick={() => setActiveLink("Усі квести")}
                    >
                        <IoLogoSnapchat className="size-12" />
                        <span>HackaChat</span>
                    </Link>

                    <nav className="text-lg mt-8">
                        <ul>
                            {links.map((link, index) => (
                                <li
                                    className="relative flex items-center mt-6 transition-all"
                                    key={index}
                                >
                                    <Link
                                        href={link.link}
                                        className="ml-2 flex items-center gap-4 text-white"
                                        onClick={() =>
                                            setActiveLink(link.title)
                                        }
                                    >
                                        <div className="size-6">
                                            {link.icon}
                                        </div>
                                        {link.title}
                                    </Link>
                                    <div
                                        className={`absolute -left-4 flex items-center transition-all duration-300 ${
                                            activeLink === link.title
                                                ? "opacity-100"
                                                : "opacity-0"
                                        }`}
                                    >
                                        <div className="w-[4px] h-10 bg-purple"></div>
                                        <div className="w-4 h-6 bg-purple blur-md"></div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
            </aside>
        </>
    );
};
