"use client";
import { getProfile } from "@/apis/profile";
import { useRouter } from "@/helpers/navigation";
import React from "react";

const CRMLayout = async ({ children }: { children: React.ReactNode }) => {
    const router = useRouter();
    const checkIfAdmin = async () => {
        try {
            const user = await getProfile();
            if (!user.isAdmin) {
                router.push("/login");
            }
        } catch (error) {
            console.error(error);
            router.push("/login");
        }
    };
    await checkIfAdmin();
    return <>{children}</>;
};

export default CRMLayout;
