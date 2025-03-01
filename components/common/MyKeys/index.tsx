"use client";
import { Button } from "@/components/ui/Button";
import { LabelInput } from "@/components/ui/LabelInput";
import SaveBtn from "@/components/ui/SaveBtn";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

const MyKeys = () => {
    const t = useTranslations("Profile");

    const [keys, setKeys] = useState<{
        trelloKey: string;
        trelloToken: string;
        jira: string;
        shopify: string;
    }>({
        trelloKey: "",
        trelloToken: "",
        jira: "",
        shopify: "",
    });

    return (
        <div className="w-full text-primary bg-secondary-light p-6 rounded-md mx-auto">
            <span className="font-semibold text-lg">{t("your-keys")}</span>
            <div className="mt-8 grid grid-cols-1 gap-4">
                <div>
                    <div className="grid grid-cols-2 gap-4">
                        <LabelInput
                            labelTitle="Trello Key"
                            value={keys.trelloKey}
                            placeholder={t("trello-key-placeholder")}
                            id="trello-key"
                            onChange={(e) => {
                                setKeys({
                                    ...keys,
                                    trelloKey: e.target.value,
                                });
                            }}
                        />
                        <LabelInput
                            labelTitle="Trello Token"
                            value={keys.trelloToken}
                            placeholder={t("trello-token-placeholder")}
                            id="trello-token"
                            onChange={(e) => {
                                setKeys({
                                    ...keys,
                                    trelloToken: e.target.value,
                                });
                            }}
                        />
                    </div>
                    <p className="text-gray mt-2 text-sm">
                        {t("trello-instruction")}
                    </p>
                </div>
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
            <SaveBtn className="mt-8 mx-auto" />
        </div>
    );
};

export default MyKeys;
