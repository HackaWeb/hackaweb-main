"use client";
import { LabelInput } from "@/components/ui/LabelInput";
import SaveBtn from "@/components/ui/SaveBtn";
import { useTranslations } from "next-intl";
import { useState } from "react";

const MyKeys = () => {
    const t = useTranslations("Profile");

    const [keys, setKeys] = useState<{
        trelloKey: string;
        trelloToken: string;
        slackToken: string;
    }>({
        trelloKey: "",
        trelloToken: "",
        slackToken: "",
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
                    <p className="text-primary mt-2 text-sm">
                        {t("trello-instruction")}
                    </p>
                </div>
                <div>
                    <LabelInput
                        labelTitle="Slack"
                        value={keys.slackToken}
                        placeholder={t("slack-placeholder")}
                        id="jira"
                        onChange={(e) => {
                            setKeys({
                                ...keys,
                                slackToken: e.target.value,
                            });
                        }}
                    />
                    <p className="text-primary mt-2 text-sm">
                        {t("slack-instruction")}
                    </p>
                </div>
            </div>
            <SaveBtn className="mt-8 mx-auto" />
        </div>
    );
};

export default MyKeys;
