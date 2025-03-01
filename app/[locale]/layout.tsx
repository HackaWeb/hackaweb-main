import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ReactNode } from "react";
import { ReduxProvider } from "@/components/providers/Redux";
import { Aside } from "@/components/common/Aside";
import { ToastProvider } from "@/components/providers/Toast";
import { getCookie } from "@/helpers/getCookie";
import { Modals } from "@/components/Modals";
import { getProfile } from "@/apis/profile";
import { setCookie } from "@/helpers/setCookie";
import { LayoutBackground } from "@/components/common/LayoutBackground";
import { cn } from "@/helpers/cn";
import { GoogleAuthProvider } from "@/components/providers/Google";
import { refreshToken as refreshTokenHandler } from "@/apis/auth";
import { Header } from "@/components/common/Header";
import { Theme } from "@/types/theme.type";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { Locale } from "@/types/locale.type";

const inter = Inter({
    variable: "--font-inter",
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
    preload: true,
    subsets: ["cyrillic-ext", "cyrillic"],
    display: "swap",
});

interface RootLayoutProps {
    children: ReactNode;
    params: Promise<{ locale: Locale }>;
}

const RootLayout = async ({ children, params }: Readonly<RootLayoutProps>) => {
    const locale = (await params).locale;
    let token = await getCookie("token");
    const theme = await getCookie<Theme>("theme");
    const refreshToken = await getCookie("refreshToken");

    let profile = null;

    if (token) {
        try {
            const profileData = await getProfile();
            console.log(profileData);
            profile = "email" in profileData ? profileData : null;
        } catch (error) {
            console.error(error);

            setCookie("token", "");
            setCookie("refreshToken", "");
        }
    }

    if (!token && refreshToken) {
        try {
            const res = await refreshTokenHandler({ refreshToken });

            if (res.token) {
                setCookie("token", res.token);
                setCookie("refreshToken", res.refreshToken);

                const profileData = await getProfile();
                profile = "email" in profileData ? profileData : null;
            }
        } catch (error) {
            console.error(error);
            setCookie("token", "");
            setCookie("refreshToken", "");
        }
    }

    const messages = await getMessages();

    return (
        <NextIntlClientProvider messages={messages}>
            <html lang="en">
                <body
                    className={cn(
                        "grid grid-cols-[1fr] lg:grid-cols-[280px_1fr] relative",
                        inter.variable,
                        theme || "dark",
                    )}
                >
                    <LayoutBackground />
                    <GoogleAuthProvider>
                        <ReduxProvider>
                            <Aside profile={profile} />
                            <div className="p-2">
                                <Header
                                    profile={profile}
                                    theme={theme}
                                    defaultLocale={locale}
                                />
                                <main className="mt-6">{children}</main>
                            </div>
                            <div className="fixed -z-10 bg-[#8C55FE] bg-opacity-40 w-[550px] h-[550px] -left-[160px] top-0 blur-[500px]"></div>
                            <div className="fixed -z-10 bg-[#00D1FF] bg-opacity-20 w-[550px] h-[550px] left-[50%] top-[50%] blur-[500px] -translate-x-[50%]"></div>
                            <div className="fixed -z-10 bg-[#BD00FF] bg-opacity-20 w-[550px] h-[550px] -right-[150px] -bottom-[100px] blur-[500px]"></div>
                            <Modals />
                            <ToastProvider />
                        </ReduxProvider>
                    </GoogleAuthProvider>
                </body>
            </html>
        </NextIntlClientProvider>
    );
};

export default RootLayout;
