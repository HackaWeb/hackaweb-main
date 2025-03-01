import React, { FC } from "react";
import { Button } from "../Button";
import { SaveBtnProps } from "./SaveBtn.props";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

const SaveBtn: FC<SaveBtnProps> = ({ className, ...props }) => {
    const t = useTranslations("Buttons");
    return (
        <Button color="purpleBackground" className={cn(className)} {...props}>
            {t("save")}
        </Button>
    );
};

export default SaveBtn;
