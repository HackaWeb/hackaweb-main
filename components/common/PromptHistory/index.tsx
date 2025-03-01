import { Table } from "@/components/ui/Table";
import { useTranslations } from "next-intl";
import React from "react";
import { PromptHistoryProps } from "./PromptHistory.props";

const PromptHistory = ({ history }: PromptHistoryProps) => {
    const t = useTranslations("Profile");
    const headersT = useTranslations("PromptTable");

    return (
        <div>
            <div className="bg-secondary-light p-4 rounded-md overflow-hidden">
                <div className="text-primary font-semibold text-lg">
                    {t("prompt-history")}
                </div>
                <Table
                    className="mt-4"
                    headers={["contents", "date"].map((item) =>
                        headersT(item),
                    )}
                    data={history
                        .filter((item) => item.sender != "Bot" && item.sender != "System")
                        .map((item) => [
                            item.message,
                            item.sentAt,
                        ])}
                />
            </div>
        </div>
    );
};

export default PromptHistory;
