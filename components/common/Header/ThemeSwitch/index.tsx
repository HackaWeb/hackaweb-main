"use client";

import { BsSun, BsMoon } from "react-icons/bs";
import { setCookie } from "@/helpers/setCookie";
import { cn } from "@/helpers/cn";
import { ThemeSwitchProps } from "./ThemeSwitch.props";
import { useRouter } from "@/helpers/navigation";

export const ThemeSwitch = ({ theme = "dark" }: ThemeSwitchProps) => {
    const router = useRouter();

    const isDarkTheme = async () => {
        return theme === "dark";
    };

    const handleThemeSwitch = async () => {
        const isDark = await isDarkTheme();
        setCookie("theme", !isDark ? "dark" : "light");
        router.refresh();
    };

    return (
        <div
            onClick={() => {
                handleThemeSwitch();
            }}
            className={cn(
                "cursor-pointer w-14 h-8 rounded-full relative transition-colors duration-200",
                theme === "dark" ? "bg-gray-800" : "bg-white",
            )}
        >
            <div
                className={`
                    absolute top-0.5 left-0.5 w-7 h-7 rounded-full 
                    flex items-center justify-center
                    transition-transform duration-200 ease-in-out
                    ${
                        theme === "dark"
                            ? "translate-x-6 bg-purple"
                            : "translate-x-0 bg-yellow"
                    }
                `}
            >
                {theme === "dark" ? (
                    <BsMoon className="size-6 text-primary p-1" />
                ) : (
                    <BsSun className="size-6 text-primary p-1" />
                )}
            </div>
        </div>
    );
};
