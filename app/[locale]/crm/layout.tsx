import { getProfile } from "@/apis/profile";
import { redirect } from "@/helpers/navigation";
import React from "react";

const CRMLayout = async ({ children }: { children: React.ReactNode }) => {
    const checkIfAdmin = async () => {
        try {
            const user = await getProfile();
            if (!user.isAdmin) {
                redirect("/login");
            }
        } catch (error) {
            console.error(error);
            redirect("/login");
        }
    };
    await checkIfAdmin();

    return <>{children}</>;
};

export default CRMLayout;
