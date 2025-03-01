"use client";

import { Select } from "@/components/ui/Select";
import { SelectOption } from "@/types/selectOption.interface";
import { useState } from "react";
import { LanguageProps } from "./Language.props";
import { useRouter } from "@/helpers/navigation";
import { usePathname } from "@/helpers/navigation";

const selectOptions: SelectOption[] = [
    {
        title: "UA",
        value: "uk",
    },
    {
        title: "EN",
        value: "en",
    },
];

export const Language = ({ defaultLocale }: LanguageProps) => {
    const router = useRouter();
    const pathname = usePathname();

    const [activeLanguage, setActiveLanguage] = useState<SelectOption>(
        selectOptions.find((option) => option.value === defaultLocale) ||
            selectOptions[0],
    );

    const onLanguageChange = (value: string) => {
        setActiveLanguage(
            selectOptions.find((option) => option.value === value) ||
                selectOptions[0],
        );
        router.push(pathname, { locale: value });
    };

    return (
        <Select
            activeOption={activeLanguage}
            setActiveOption={setActiveLanguage}
            options={selectOptions}
            placeholder="Select language"
            id="language"
            className="w-28"
            onChange={(option) => onLanguageChange(option.value)}
        />
    );
};
