"use client";
import { Button } from "@/components/ui/Button";
import { LabelInput } from "@/components/ui/LabelInput";
import { useEffect, useState } from "react";

const MyKeys = () => {
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
            <span className="font-semibold text-lg">Ваші API_KEYS</span>
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <LabelInput
                    labelTitle="Trello"
                    value={keys.trello}
                    placeholder="Введіть Trello API ключ..."
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
                    placeholder="Введіть Jira API ключ..."
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
                    placeholder="Введіть Shopify API ключ..."
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
