"use client";

import { getCredentials, updateCredential } from "@/apis/credentials";
import { LabelInput } from "@/components/ui/LabelInput";
import SaveBtn from "@/components/ui/SaveBtn";
import { ApiKey, ApiKeyType, UserProfile } from "@/types/user.interface";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const MyKeys = ({ keys }: { keys: ApiKey[] }) => {
    const t = useTranslations("Profile");
    const t_keys = useTranslations("Keys");
    const [trelloKey, setTrelloKey] = useState(
        keys.find((key) => key.keyType == ApiKeyType.TRELLO_API_KEY)?.value ??
            "",
    );
    const [trelloSecret, setTrelloSecret] = useState(
        keys.find((key) => key.keyType == ApiKeyType.TRELLO_SECRET)?.value ??
            "",
    );
    const [slackKey, setSlackKey] = useState(
        keys.find((key) => key.keyType == ApiKeyType.SLACK_API_KEY)?.value ??
            "",
    );

    const updateCredentialHandler = async (credential: ApiKey) => {
        try {
            const res = await updateCredential(credential);
            let errorMessage;
            if (!res.isSuccess) {
                switch (credential.keyType) {
                    case ApiKeyType.TRELLO_API_KEY:
                        errorMessage = t_keys("trello-key-error");
                        break;
                    case ApiKeyType.TRELLO_SECRET:
                        errorMessage = t_keys("trello-secret-error");
                        break;
                    case ApiKeyType.SLACK_API_KEY:
                        errorMessage = t_keys("slack-key-error");
                        break;
                }
                toast.error(errorMessage);
                return false;
            }
            return true;
        } catch (error) {
            console.error(error);
            toast.error(t("profile-error"));
            return false;
        }
    };

    const submitKeys = async () => {
        let hasError = false;

        let result = await updateCredentialHandler({
            keyType: ApiKeyType.TRELLO_API_KEY,
            value: trelloKey,
        });
        if (!result) hasError = true;

        result =
            (await updateCredentialHandler({
                keyType: ApiKeyType.TRELLO_SECRET,
                value: trelloSecret,
            })) && result;
        if (!result) hasError = true;
        result =
            (await updateCredentialHandler({
                keyType: ApiKeyType.SLACK_API_KEY,
                value: slackKey,
            })) && result;
        if (!result) hasError = true;

        if (!hasError) {
            toast.success("API ключі успішно змінено");
        } else {
            toast.error("Сталася помилка при оновленні ключів");
        }
    };

    return (
        <div className="w-full text-primary bg-secondary-light p-6 rounded-md mx-auto">
            <span className="font-semibold text-lg">{t("your-keys")}</span>
            <div className="mt-8 grid grid-cols-1 gap-4">
                <div>
                    <div className="grid grid-cols-2 gap-4">
                        <LabelInput
                            labelTitle="Trello Key"
                            value={trelloKey}
                            placeholder={t("trello-key-placeholder")}
                            id="trello-key"
                            onChange={(e) => setTrelloKey(e.target.value)}
                        />
                        <LabelInput
                            labelTitle="Trello Token"
                            value={trelloSecret}
                            placeholder={t("trello-token-placeholder")}
                            id="trello-token"
                            onChange={(e) => setTrelloSecret(e.target.value)}
                        />
                    </div>
                    <p className="text-primary mt-2 text-sm">
                        {t("trello-instruction")}
                    </p>
                </div>
                <div>
                    <LabelInput
                        labelTitle="Slack"
                        value={slackKey}
                        placeholder={t("slack-placeholder")}
                        id="slack"
                        onChange={(e) => setSlackKey(e.target.value)}
                    />
                    <p className="text-primary mt-2 text-sm">
                        {t("slack-instruction")}
                    </p>
                </div>
            </div>
            <SaveBtn onClick={submitKeys} className="mt-8 mx-auto" />
        </div>
    );
};

export default MyKeys;
