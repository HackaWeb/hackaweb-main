import { useTranslations } from "next-intl";

export const printUserNickname = (
    firstName: string | null,
    lastName: string | null,
) => {
    const t = useTranslations("Profile");

    if (!firstName && !lastName) {
        return t("user");
    }

    return `${firstName || ""} ${lastName || ""}`;
};
