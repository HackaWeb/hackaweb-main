"use client";

import { Button } from "@/components/ui/Button";
import { HomePageComponentProps } from "./Home.props";
import { setOpenedModal } from "@/store/slices/openedModal";
import { Modal } from "@/types/modal.enum";
import { useAppDispatch } from "@/store/hooks/useAppDispatch";
import { useTranslations } from "next-intl";

export const HomePageComponent = ({}: HomePageComponentProps) => {
    const dispatch = useAppDispatch();
    const t = useTranslations("Homepage");

    const onButtonClick = () => {
        dispatch(setOpenedModal(Modal.CreateSmth));
    };

    return (
        <div className="bg-secondary-light p-6 rounded-md text-primary">
            <h1>{t("title")}</h1>
            <p>{t("content")}</p>
            <Button
                onClick={onButtonClick}
                color="purpleBackground"
                className="mt-3"
            >
                Modal test
            </Button>
        </div>
    );
};
