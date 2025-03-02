"use client";

import { TbArrowBackUp } from "react-icons/tb";
import { Button } from "../Button";
import { ReturnBtnProps } from "./ReturnBtn.props";
import { cn } from "@/helpers/cn";
import { useRouter } from "@/helpers/navigation";
import { useAppDispatch } from "@/store/hooks/useAppDispatch";
import { closeModal, selectOpenedModal } from "@/store/slices/openedModal";
import { useAppSelector } from "@/store/hooks/useAppSelector";
import { useTranslations } from "next-intl";

export const ReturnBtn = ({ className }: ReturnBtnProps) => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const t = useTranslations("Buttons");
    const openedModal = useAppSelector(selectOpenedModal);

    const closeModalHandler = () => {
        dispatch(closeModal());
    };

    const goBack = () => {
        if (openedModal) {
            closeModalHandler();
            return;
        }

        router.back();
        return;
    };

    return (
        <Button
            color="purpleBorder"
            className={cn("flex gap-2", className)}
            onClick={() => goBack()}
        >
            <TbArrowBackUp size={22} />
            <span>{t("go-back")}</span>
        </Button>
    );
};
