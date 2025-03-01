"use client";

import { Button } from "@/components/ui/Button";
import { HomePageComponentProps } from "./Home.props";
import { setOpenedModal } from "@/store/slices/openedModal";
import { Modal } from "@/types/modal.enum";
import { useAppDispatch } from "@/store/hooks/useAppDispatch";
import { useTranslations } from "next-intl";
import { RadioOption } from "@/types/radioOptions.interface";
import { useState } from "react";
import { RadioGroup } from "@/components/ui/RadioGroup";

const options: RadioOption[] = [
    { label: "Option 1", value: "option1" },
    { label: "Option 2", value: "option2" },
    { label: "Option 3", value: "option3" },
];

export const HomePageComponent = ({}: HomePageComponentProps) => {
    const [selected, setSelected] = useState("option1");

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
            <div className="p-4">
                <h2 className="text-lg font-semibold mb-2">
                    Select an Option:
                </h2>
                <RadioGroup
                    options={options}
                    name="example"
                    selectedValue={selected}
                    onChange={setSelected}
                />
                <p className="mt-4">Selected value: {selected}</p>
            </div>
        </div>
    );
};
