"use client";

import { getCredentials, updateCredential } from "@/apis/credentials";
import { LabelInput } from "@/components/ui/LabelInput";
import SaveBtn from "@/components/ui/SaveBtn";
import { ApiKey, ApiKeyType, UserProfile } from "@/types/user.interface";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const MyKeys = () => {
    const t = useTranslations("Profile");
    const [trelloKey, setTrelloKey] = useState("");
    const [trelloSecret, setTrelloSecret] = useState("");
    const [slackKey, setSlackKey] = useState("");

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const userProfile = await getCredentials();
                console.log(userProfile.keys);
                setTrelloKey(
                    userProfile.keys.find(
                        (key) => key.keyType === ApiKeyType.TRELLO_API_KEY,
                    )?.value ?? "",
                );
                setTrelloSecret(
                    userProfile.keys.find(
                        (key) => key.keyType === ApiKeyType.TRELLO_SECRET,
                    )?.value ?? "",
                );
                setSlackKey(
                    userProfile.keys.find(
                        (key) => key.keyType === ApiKeyType.SLACK_API_KEY,
                    )?.value ?? "",
                );
            } catch (error) {
                console.error("Failed to load profile:", error);
                toast.error("Не вдалося завантажити профіль");
            }
        };

        fetchProfile();
    }, []);

    const updateCredentialHandler = async (credential: ApiKey) => {
        try {
            const res = await updateCredential(credential);
            if (!res.isSuccess) {
                let errorMessage = "Failed to update ";
                switch (credential.keyType) {
                    case ApiKeyType.TRELLO_API_KEY:
                        errorMessage += "Trello API key";
                        break;
                    case ApiKeyType.TRELLO_SECRET:
                        errorMessage += "Trello Secret key";
                        break;
                    case ApiKeyType.SLACK_API_KEY:
                        errorMessage += "Slack key";
                        break;
                }
                toast.error(errorMessage);
                return false;
            }
            return true;
        } catch (error) {
            console.error(error);
            toast.error("Помилка при оновленні ключа");
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
