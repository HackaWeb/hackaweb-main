"use client";
import { Button } from "@/components/ui/Button";
import { LabelInput } from "@/components/ui/LabelInput";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

const MyKeys = () => {
    const t = useTranslations("Profile");
    const [keys, setKeys] = useState<{
        trello: string;
        jira: string;
        shopify: string;
    }>({
        trello: "",
        jira: "",
        shopify: "",
    });

    useEffect(() => {
        console.log(keys);
    }, [keys]);

    return (
        <div className="text-primary container bg-secondary-light p-6 rounded-md">
            <span className="font-semibold text-lg">{t("your-keys")}</span>
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <LabelInput
                    labelTitle="Trello"
                    value={keys.trello}
                    placeholder={t("trello-placeholder")}
                    id="trello"
                    onChange={(e) => {
                        setKeys({
                            ...keys,
                            trello: e.target.value,
                        });
                    }}
                />
                <LabelInput
                    labelTitle="Jira"
                    value={keys.jira}
                    placeholder={t("jira-placeholder")}
                    id="jira"
                    onChange={(e) => {
                        setKeys({
                            ...keys,
                            jira: e.target.value,
                        });
                    }}
                />
                <LabelInput
                    labelTitle="Shopify"
                    value={keys.shopify}
                    placeholder={t("shopify-placeholder")}
                    id="shopify"
                    onChange={(e) => {
                        setKeys({
                            ...keys,
                            shopify: e.target.value,
                        });
                    }}
                />
            </div>

            <Button color="purpleBackground" className="mt-8 mx-auto">
                Зберегти
            </Button>
        </div>
    );
};

export default MyKeys;
